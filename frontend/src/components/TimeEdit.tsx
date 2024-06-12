import { Flex, Input } from "@mantine/core";
import { ButtonBasic } from "./ui/ButtonBasic";
import { ModalTimeEdit } from "./ui/ModalTimeEdit";

type Props = {
  startTime: string;
  endTime: string;
  startTitle: string;
  endTitle: string;
};

export const TimeEdit = ({ startTime, endTime, startTitle, endTitle }: Props) => {
  return (
    <Flex mih={50} gap="md" justify="center" align="center" direction="row" wrap="nowrap">
      <ModalTimeEdit time={startTime} title={startTitle}>
        <Input placeholder="時間を入力" onChange={() => {}} />
        <ButtonBasic click={() => {}}>SAVE</ButtonBasic>
      </ModalTimeEdit>
      <p>から</p>
      <ModalTimeEdit time={endTime} title={endTitle}>
        <Input placeholder="時間を入力" onChange={() => {}} />
        <ButtonBasic click={() => {}}>SAVE</ButtonBasic>
      </ModalTimeEdit>
    </Flex>
  );
};
