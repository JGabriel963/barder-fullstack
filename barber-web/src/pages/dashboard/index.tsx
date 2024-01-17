import { Sidebar } from "@/components/sidebar";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberPRO - Minha Barbearia</title>
      </Head>
      <Sidebar>
        <Flex>
          <Text>Bem vindo ao Dashboard</Text>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
