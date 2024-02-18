import { Sidebar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  customer: z.string().min(1, "Campo obrigatório"),
  haircutSelected: z.string(),
});

type FormData = z.infer<typeof schema>;

interface HaircutsProps {
  id: string;
  name: string;
  price: string;
  status: boolean;
  user_id: string;
}

interface NewProps {
  haircuts: HaircutsProps[];
}

export default function New({ haircuts }: NewProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      customer: "",
      haircutSelected: haircuts[0].id,
    },
  });

  async function handleRegister(data: FormData) {
    setLoading(true);
    try {
      const apiClient = setupAPIClient();
      await apiClient.post("/schedule", {
        customer: data.customer,
        haircut_id: data.haircutSelected,
      });

      toast({
        title: "Sucesso :)",
        status: "success",
        isClosable: true,
        variant: "subtle",
        position: "top-right",
      });

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error ao tentar registrar",
        status: "error",
        isClosable: true,
        variant: "subtle",
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>BarberPRO | Agendamento</title>
      </Head>
      <Sidebar>
        <Flex direction="column" align="flex-start" justify="flex-start">
          <Flex direction="row" w="100%" align="center" justify="flex-start">
            <Heading fontSize="3xl" mt={4} mb={4} mr={4}>
              Novo corte
            </Heading>
          </Flex>

          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit(handleRegister)}
          >
            <Flex
              maxW="700px"
              pt={8}
              pb={8}
              width="100%"
              direction="column"
              align="center"
              justify="center"
              bg="barber.400"
            >
              <Input
                placeholder="Nome do cliente"
                w="85%"
                mb={3}
                size="lg"
                type="text"
                bg="barber.900"
                {...register("customer")}
              />

              <Select
                bg="barber.900"
                mb={3}
                size="lg"
                w="85%"
                {...register("haircutSelected")}
              >
                {haircuts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>

              <Button
                type="submit"
                w="85%"
                size="lg"
                color="gray.900"
                bg="button.cta"
                _hover={{ bg: "#ffb13e" }}
                isLoading={loading}
              >
                Cadastrar
              </Button>
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
    const reponse = await apiClient.get("/haircuts", {
      params: {
        status: true,
      },
    });

    if (reponse.data === null) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {
        haircuts: reponse.data,
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
