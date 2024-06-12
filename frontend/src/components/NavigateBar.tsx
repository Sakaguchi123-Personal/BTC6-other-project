import { Group, Stack, Text } from "@mantine/core";
import { IoCalendarSharp, IoDocumentTextSharp, IoHomeSharp, IoPersonCircle } from "react-icons/io5";
import styled from "styled-components";

type Props = {
  className: string;
};

export const NavigateBar = ({ className }: Props) => {
  return (
    <Sdiv className={className}>
      <Group justify="space-between" p={10}>
        <Stack justify="center" align="center" gap={5}>
          <IoHomeSharp size={20} spacing={0} color="#ddb72d" />
          <Text size="xs" c={"#ddb72d"}>
            HOME
          </Text>
        </Stack>
        <Stack justify="center" align="center" gap={5}>
          <IoCalendarSharp size={20} />

          <Text size="xs">calender</Text>
        </Stack>
        <Stack justify="center" align="center" gap={5}>
          <IoDocumentTextSharp size={20} />

          <Text size="xs">request</Text>
        </Stack>
        <Stack justify="center" align="center" gap={5}>
          <IoPersonCircle size={20} />
          <Text size="xs">account</Text>
        </Stack>
      </Group>
    </Sdiv>
  );
};

const Sdiv = styled.div`
  background-color: #ededed;
  border-radius: 25px;
  padding: 5px 10px;
  margin: 0px 10px;
`;
