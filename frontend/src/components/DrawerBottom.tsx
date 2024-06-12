import { Button, Drawer, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";

import { ButtonBasic, TimeEdit } from "./index";

type Props = {
  className: string;
};

export const DrawerBottom = ({ className }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Button
        onClick={open}
        w={"90%"}
        color="gray"
        variant="outline"
        className={className}
        radius={10}
      >
        <SArrowDownIcon />
        離業
      </Button>

      <Drawer opened={opened} onClose={close} title="離業時間" position="bottom" size={250}>
        <TimeEdit startTime="08:00" endTime="09:00" startTitle="離業開始" endTitle="離業終了" />

        <Flex gap="80" justify="center" align="center" direction="row" wrap="wrap" mt={20}>
          <ButtonBasic size="lg">開始</ButtonBasic>
          <ButtonBasic click={close} size={"lg"}>
            終了
          </ButtonBasic>
        </Flex>
      </Drawer>
    </>
  );
};

const SArrowDownIcon = styled(IoIosArrowDown)`
  margin-right: 10px;
`;
