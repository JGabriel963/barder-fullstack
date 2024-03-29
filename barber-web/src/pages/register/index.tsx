import { Button, Center, Flex, Input, Text, useToast } from "@chakra-ui/react";
import Image from "next/image";
import logoImg from "../../../public/logo.svg";
import Head from "next/head";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { canSSRGuest } from "@/utils/canSSRGuest";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(6, "No mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const { signUp } = useContext(AuthContext);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  async function handleRegister({ email, name, password }: FormData) {
    await signUp({
      name,
      email,
      password,
    }).then(() => {
      toast({
        title: "Cadastrado com sucesso",
        status: "success",
        isClosable: true,
        variant: "subtle",
        position: "top-right",
      });
    });
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
              color={errors.name && "tomato"}
              _placeholder={{ opacity: 0.4, color: "inherit" }}
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
              color={errors.email && "tomato"}
              _placeholder={{ opacity: 0.4, color: "inherit" }}
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
              color={errors.password && "tomato"}
              _placeholder={{ opacity: 0.4, color: "inherit" }}
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

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
