import { Button, Flex, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { FaEdit } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
  title: string;
  time: string;
  size?: string;
  disabled?: boolean;
  className?: string;
};

export const ModalTimeEdit = ({ children, title, time, size, disabled }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        disabled={disabled}
        onClick={open}
        variant={"outline"}
        m={5}
        radius={8}
        color="gray"
        size={size}
        p={"0px 17px"}
      >
        {time}
        <FaEdit size={20} style={{ marginLeft: 5 }} />
      </Button>

      <Modal opened={opened} onClose={close} title={title} centered display={"flex"}>
        <Flex mih={50} gap="md" justify="center" align="center" direction="column">
          {children}
        </Flex>
      </Modal>
    </>
  );
};
