import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberPRO - Minha Barbearia</title>
      </Head>
      <Flex>
        <Text>Bem vindo ao Dashboard</Text>
      </Flex>
    </>
  );
}
