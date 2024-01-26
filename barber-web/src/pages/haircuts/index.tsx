import { Sidebar } from "@/components/sidebar";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Switch,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { IoMdPricetag } from "react-icons/io";

export default function Haricuts() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>Modelos de corte - Minha barbearia</title>
      </Head>

      <Sidebar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Flex
            flexDirection={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
            mb={0}
          >
            <Heading
              fontSize={isMobile ? "28px" : "3xl"}
              mt={4}
              mb={4}
              mr={4}
              color="orange.400"
            >
              Modelos de corte
            </Heading>

            <Link href="/haircuts/new">
              <Button bg="barber.400" color="#FFFF">
                Cadastrar novo
              </Button>
            </Link>

            <Stack ml="auto" align="center" direction="row">
              <Text fontWeight="bold">ATIVOS</Text>
              <Switch colorScheme="green" size="lg" />
            </Stack>
          </Flex>

          <Link href="/" style={{ width: "100%" }}>
            <Flex
              cursor="pointer"
              w="100%"
              p={4}
              bg="barber.400"
              direction={isMobile ? "column" : "row"}
              align={isMobile ? "flex-start" : "center"}
              rounded="4"
              mb={4}
              justifyContent="space-between"
            >
              <Flex
                mb={isMobile ? 2 : 0}
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <IoMdPricetag size={28} color="#fba931" />
                <Text fontWeight="bold" ml={4} noOfLines={2}>
                  Corte Completo
                </Text>
              </Flex>

              <Text fontWeight="bold">Preço: R$ 59.90</Text>
            </Flex>
          </Link>
        </Flex>
      </Sidebar>
    </>
  );
}
