import { Group, Stack, Text } from "@mantine/core";
import { IoCalendarSharp, IoDocumentTextSharp, IoHomeSharp, IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {
  className?: string;
  select: string;
};

export const NavigateBar = ({ className, select }: Props) => {
  const navigate = useNavigate();
  const navigateTab = [
    {
      tab: "home",
      icon: <IoHomeSharp size={20} spacing={0} />,
    },
    {
      tab: "calender",
      icon: <IoCalendarSharp size={20} spacing={0} />,
    },
    {
      tab: "request",
      icon: <IoDocumentTextSharp size={20} spacing={0} />,
    },
    {
      tab: "account",
      icon: <IoPersonCircle size={20} spacing={0} />,
    },
  ];

  return (
    <StyledDiv className={className}>
      <Group justify="space-between" p={10}>
        {/* -------------------------------------------------- */}

        {navigateTab.map(obj => {
          return (
            <Stack
              justify="center"
              align="center"
              gap={5}
              c={select === obj.tab ? "#ddb72d" : ""}
              onClick={() => {
                navigate(`/${obj.tab}`);
              }}
              key={obj.tab}
            >
              {obj.icon}
              <Text size="xs">{obj.tab}</Text>
            </Stack>
          );
        })}

        {/* -------------------------------------------------- */}
      </Group>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background-color: #ededed;
  border-radius: 25px;
  padding: 5px 10px;
  margin: 0px 10px;
`;
