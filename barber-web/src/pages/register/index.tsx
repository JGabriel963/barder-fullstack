import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import Image from "next/image";
import logoImg from "../../../public/logo.svg";
import Head from "next/head";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string(),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "No mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  async function handleRegister(data: FormData) {
    console.log(data);
  }

  return (
    <>
      <Head>
        <title>BarberPRO | Crie sua conta</title>
      </Head>
      <Flex
        background="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <form onSubmit={handleSubmit(handleRegister)}>
          <Flex
            width={640}
            textColor="#fff"
            direction="column"
            p={14}
            rounded={8}
          >
            <Center p={4}>
              <Image
                src={logoImg}
                quality={100}
                objectFit="fill"
                alt="Lgo barbeiro"
              />
            </Center>

            <Input
              background="barber.400"
              variant="filled"
              size="lg"
              placeholder="Nome da barbearia"
              type="text"
              mb={3}
              _hover={{ bg: "#1b1c29" }}
              {...register("name")}
            />

            <Input
              background="barber.400"
              variant="filled"
              size="lg"
              placeholder="example@gmail.com"
              type="email"
              mb={3}
              _hover={{ bg: "#1b1c29" }}
              {...register("email")}
            />

            <Input
              background="barber.400"
              variant="filled"
              size="lg"
              placeholder="********"
              type="password"
              mb={6}
              _hover={{ bg: "#1b1c29" }}
              {...register("password")}
            />

            <Button
              background="button.cta"
              mb={6}
              color="gray.900"
              size="lg"
              _hover={{ bg: "#ffb13e" }}
              type="submit"
            >
              Cadastrar
            </Button>

            <Center mt={2}>
              <Link href="/login">
                <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>
                  Já possui uma conta? <strong>Faça login</strong>
                </Text>
              </Link>
            </Center>
          </Flex>
        </form>
      </Flex>
    </>
  );
}
