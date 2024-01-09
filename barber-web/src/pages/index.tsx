import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Pizzaria</title>
      </Head>
      <Flex
        background="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={30} color="#fff">
          Página Home
        </Text>
      </Flex>
    </>
  );
}
