import { ActionIcon, Flex } from "@mantine/core";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Props = {
  title: React.ReactNode;
  clickLeftArrow: () => void;
  clickRightArrow: () => void;
};

export const SelectBarDate = ({ title, clickLeftArrow, clickRightArrow }: Props) => {
  return (
    <>
      <Flex justify={"center"} align={"center"} gap={"md"}>
        <ActionIcon
          variant="white"
          size="xl"
          radius="md"
          aria-label="Settings"
          color="gray"
          onClick={clickLeftArrow}
        >
          <IoIosArrowBack size={30} />
        </ActionIcon>

        <h3>{title}</h3>

        <ActionIcon
          variant="white"
          size="xl"
          radius="md"
          aria-label="Settings"
          color="gray"
          onClick={clickRightArrow}
        >
          <IoIosArrowForward size={30} />
        </ActionIcon>
      </Flex>
    </>
  );
};
