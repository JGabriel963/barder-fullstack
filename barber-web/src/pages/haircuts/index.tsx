import { Sidebar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
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
import { ChangeEvent, useState } from "react";
import { IoMdPricetag } from "react-icons/io";

interface HaircutItem {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface HaircutsProps {
  haircuts: HaircutItem[];
}

export default function Haricuts({ haircuts }: HaircutsProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [haircutsList, setHaircutsList] = useState(haircuts || []);

  const [disabledHaircut, setDisableHaircut] = useState<"enabled" | "disabled">(
    "enabled"
  );

  async function handleDisabled(e: ChangeEvent<HTMLInputElement>) {
    const apiClient = setupAPIClient();

    if (e.target.value === "enabled") {
      setDisableHaircut("disabled");

      const reponse = await apiClient.get("/haircuts", {
        params: {
          status: false,
        },
      });

      setHaircutsList(reponse.data);
    } else {
      setDisableHaircut("enabled");
      const reponse = await apiClient.get("/haircuts", {
        params: {
          status: true,
        },
      });

      setHaircutsList(reponse.data);
    }
  }

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
              <Switch
                colorScheme="green"
                size="lg"
                value={disabledHaircut}
                onChange={(e) => handleDisabled(e)}
                isChecked={disabledHaircut === "disabled" ? false : true}
              />
            </Stack>
          </Flex>

          {haircutsList.map((haircut) => (
            <Link
              href={`/haircuts/${haircut.id}`}
              style={{ width: "100%" }}
              key={haircut.id}
            >
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
                    {haircut.name}
                  </Text>
                </Flex>

                <Text fontWeight="bold">Preço: R$ {haircut.price}</Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/haircuts", {
      params: {
        status: true,
      },
    });

    if (response.data === null) {
      return {
        redirect: { destination: "/dashboard", permanent: false },
      };
    }

    return {
      props: {
        haircuts: response.data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: { destination: "/dashboard", permanent: false },
    };
  }
});
