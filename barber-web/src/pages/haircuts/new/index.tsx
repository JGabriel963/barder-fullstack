import { Sidebar } from "@/components/sidebar";
import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FiChevronLeft } from "react-icons/fi";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  price: z.string().nonempty("Campo obrigatório!"),
});

type FormData = z.infer<typeof schema>;

export default function NewHaircut() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  async function handleHaircut({ name, price }: FormData) {
    console.log(name, price);
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
                {...register("name")}
              />
              <Input
                placeholder="Valor do corte ex.: 59.90"
                size="lg"
                type="text"
                w="85%"
                bg="gray.900"
                mb={4}
                {...register("price")}
              />

              <Button
                type="submit"
                w="85%"
                size="lg"
                color="gray.900"
                mb={6}
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
