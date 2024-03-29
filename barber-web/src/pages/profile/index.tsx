import { Sidebar } from "@/components/sidebar";
import { AuthContext } from "@/contexts/AuthContext";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UserProps {
  id: string;
  name: string;
  email: string;
  address: string | null;
}

interface ProfileProps {
  user: UserProps;
  premium: boolean;
}

const schema = z.object({
  name: z.string().min(1, "Campo não dev ser vazio!"),
  address: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Profile({ user, premium }: ProfileProps) {
  const { logoutUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      name: user?.name,
      address: user?.address,
    },
  });

  async function handleLogout() {
    await logoutUser();
  }

  async function handleUpdateUser({ name, address }: FormData) {
    setLoading(true);

    try {
      const apiClient = setupAPIClient();
      await apiClient.put("/user", {
        name,
        address,
      });

      setLoading(false);

      toast({
        title: "Dados alterado com sucesso!",
        status: "success",
        isClosable: true,
        variant: "subtle",
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Error ao atualizar seus dados!",
        status: "error",
        isClosable: true,
        variant: "subtle",
        position: "top-right",
      });
    }
  }

  return (
    <>
      <Head>
        <title>Minha Conta - BarberPRO</title>
      </Head>

      <Sidebar>
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <Flex
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Flex
              w="100%"
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Heading fontSize="3xl" mt="4" mb="4" mr="4" color="orange.900">
                Minha Conta
              </Heading>
            </Flex>

            <Flex
              pt={8}
              pb={8}
              bg="barber.400"
              maxW="700px"
              w="100%"
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Flex direction="column" w="85%">
                <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                  Nome da barbearia:
                </Text>
                <Input
                  w="100%"
                  background="gray.900"
                  placeholder="Nome da sua barbearia"
                  size="lg"
                  borderColor="gray"
                  type="text"
                  mb={3}
                  {...register("name")}
                />

                <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                  Endereço:
                </Text>
                <Input
                  w="100%"
                  background="gray.900"
                  placeholder="Endereço da barbearia"
                  size="lg"
                  borderColor="gray"
                  type="text"
                  mb={3}
                  {...register("address")}
                />

                <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                  Plano atual:
                </Text>

                <Flex
                  direction="row"
                  w="100%"
                  mb={3}
                  p={1}
                  borderWidth={1}
                  borderColor="gray"
                  rounded={6}
                  bg="barber.900"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text
                    p={2}
                    fontSize="lg"
                    color={premium ? "#FBA931" : "#4dffb4"}
                  >
                    Plano {premium ? "Premium" : "Grátis"}
                  </Text>
                  <Link href="/planos">
                    <Box
                      cursor="pointer"
                      p={1}
                      pl={2}
                      pr={2}
                      bg="#00cd52"
                      rounded={4}
                      color="white"
                    >
                      Mudar plano
                    </Box>
                  </Link>
                </Flex>

                <Button
                  type="submit"
                  w="100%"
                  mt={3}
                  mb={4}
                  bg="button.cta"
                  size="lg"
                  _hover={{ bg: "#ffb13e" }}
                  isLoading={loading}
                >
                  Salvar
                </Button>

                <Button
                  w="100%"
                  mb={6}
                  bg="transparent"
                  borderWidth={2}
                  borderColor="red.500"
                  color="red.500"
                  size="lg"
                  _hover={{ bg: "transparent" }}
                  onClick={handleLogout}
                >
                  Sair da conta
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </form>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/me");

    const user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      address: response.data?.address,
    };

    return {
      props: {
        user: user,
        premium:
          response.data?.subscriptions?.status === "active" ? true : false,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});
