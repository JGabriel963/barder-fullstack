import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { FiUser, FiScissors } from "react-icons/fi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ScheduleItem } from "@/pages/dashboard";

interface ModalInfoProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ScheduleItem;
  finishService: () => Promise<void>;
}

export function ModalInfo({
  isOpen,
  onOpen,
  onClose,
  data,
  finishService,
}: ModalInfoProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="barber.400" color="#fff">
          <ModalHeader>Próximo</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex align="center" mb={3}>
              <FiUser size={28} color="#ffb13e" />
              <Text ml={3} fontSize="large" fontWeight="bold" color="white">
                {data?.customer}
              </Text>
            </Flex>
            <Flex align="center" mb={3}>
              <FiScissors size={28} color="#ffff" />
              <Text ml={3} fontSize="large" fontWeight="bold" color="white">
                {data?.haircuts.name}
              </Text>
            </Flex>
            <Flex align="center" mb={3}>
              <FaMoneyBillAlt size={28} color="#46ef75" />
              <Text ml={3} fontSize="large" fontWeight="bold" color="white">
                R$ {data?.haircuts.price}
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="button.cta"
              _hover={{ bg: "#ffb13e" }}
              mr={3}
              color="white"
              onClick={() => finishService()}
            >
              Finalizar Serviço
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
