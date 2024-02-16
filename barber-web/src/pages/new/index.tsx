import { Sidebar } from "@/components/sidebar";
import { Button, Flex, Heading, Input, Select } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  customer: z.string().min(1, "Campo obrigatório"),
});

type FormData = z.infer<typeof schema>;

export default function New() {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

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

          <form style={{ width: "100%" }}>
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

              <Select bg="barber.900" mb={3} size="lg" w="85%">
                <option key={1} value="Barba completa">
                  Barba completa
                </option>
              </Select>

              <Button
                w="85%"
                size="lg"
                color="gray.900"
                bg="button.cta"
                _hover={{ bg: "#ffb13e" }}
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
