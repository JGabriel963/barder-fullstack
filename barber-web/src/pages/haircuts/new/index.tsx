import { Sidebar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiChevronLeft } from "react-icons/fi";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  price: z.string().nonempty("Campo obrigatório!"),
});

type FormData = z.infer<typeof schema>;

interface NewHaircutProps {
  subscription: boolean;
  count: number;
}

export default function NewHaircut({ subscription, count }: NewHaircutProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleHaircut({ name, price }: FormData) {
    setLoading(true);
    try {
      const apiClient = setupAPIClient();

      await apiClient.post("/haircut", {
        name,
        price,
      });

      setLoading(false);

      toast({
        title: "Corte salvo com sucesso!",
        status: "success",
        isClosable: true,
        variant: "subtle",
        position: "top-right",
      });

      Router.push("/haircuts");
    } catch (error) {
      console.log(error);

      setLoading(false);

      toast({
        title: "Erro ao salvar corte!",
        status: "error",
        isClosable: true,
        variant: "subtle",
        position: "top-right",
      });
    }
  }

  const [isMobile] = useMediaQuery("(max-width: 500px)");
  return (
    <>
      <Head>
        <title>BarberPRO - Novo modelo de corte</title>
      </Head>
      <Sidebar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            align={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                bg="barber.400"
                color="white"
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={4}
              >
                <FiChevronLeft size={24} color="#fff" />
                Voltar
              </Button>
            </Link>
            <Heading
              color="orange.400"
              mt={4}
              mb={4}
              mr={4}
              fontSize={isMobile ? "28px" : "3xl"}
            >
              Modelos de corte
            </Heading>
          </Flex>

          <form
            onSubmit={handleSubmit(handleHaircut)}
            style={{ width: "100%" }}
          >
            <Flex
              maxW="700px"
              bg="barber.400"
              w="100%"
              align="center"
              justify="center"
              pt={8}
              pb={8}
              direction="column"
            >
              <Heading mb={4} fontSize={isMobile ? "22px" : "3xl"}>
                Cadastrar modelo
              </Heading>

              <Input
                placeholder="Nome do corte"
                size="lg"
                type="text"
                w="85%"
                bg="gray.900"
                mb={3}
                disabled={!subscription && count >= 3}
                {...register("name")}
              />
              <Input
                placeholder="Valor do corte ex.: 59.90"
                size="lg"
                type="text"
                w="85%"
                bg="gray.900"
                mb={4}
                disabled={!subscription && count >= 3}
                {...register("price")}
              />

              <Button
                type="submit"
                w="85%"
                size="lg"
                color="gray.900"
                mb={6}
                bg="button.cta"
                isLoading={loading}
                _hover={{ bg: "#ffb13e" }}
                disabled={!subscription && count >= 3}
              >
                Cadastrar
              </Button>

              {!subscription && count >= 3 && (
                <Flex direction="row" align="center" justifyContent="center">
                  <Text>Você atingiu seu limite de cortes.</Text>
                  <Link href="/planos">
                    <Text
                      fontWeight="bold"
                      color="#31FB6A"
                      cursor="pointer"
                      ml={1}
                    >
                      Seja premium
                    </Text>
                  </Link>
                </Flex>
              )}
            </Flex>
          </form>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/haircut/check");
    const count = await apiClient.get("/haircut/count");

    return {
      props: {
        subscription:
          response.data?.subscriptions?.status === "active" ? true : false,
        count: count.data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: { destination: "/dashboard", permanent: false },
    };
  }
});
