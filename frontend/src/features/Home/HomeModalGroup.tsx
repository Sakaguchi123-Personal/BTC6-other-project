import { Group, Input } from "@mantine/core";
import axios from "axios";
import { ButtonBasic, ModalTimeEdit } from "../../components";

type Props = {
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  setStartTimeInput: React.Dispatch<React.SetStateAction<string>>;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  setEndTimeInput: React.Dispatch<React.SetStateAction<string>>;
  startTime: string;
  startTimeInput: string;
  endTime: string;
  endTimeInput: string;
  workRecordId: null | number;
};

export const HomeModalGroup = ({
  setStartTime,
  setStartTimeInput,
  setEndTime,
  setEndTimeInput,
  startTime,
  startTimeInput,
  endTime,
  endTimeInput,
  workRecordId,
}: Props) => {
  //-----------------------------------------------------------------------------------
  //就業時間の計算
  const workingTime = (startTime: string, endTime: string) => {
    const start = startTime.split(":").map(num => Number(num));
    const end = endTime.split(":").map(num => Number(num));

    const startMillisecond = new Date(0, 0, 0, start[0], start[1]);
    let endMillisecond = new Date(0, 0, 0, end[0], end[1]);
    endMillisecond = new Date(endMillisecond.getTime() - 1 * 60 * 60 * 1000);

    const workTime = endMillisecond.getTime() - startMillisecond.getTime();

    const hours = Math.floor(workTime / (1000 * 3600));
    const minutes = Math.floor((workTime % (1000 * 3600)) / (1000 * 60));
    return ("00" + hours).slice(-2) + ":" + ("00" + minutes).slice(-2);
  };

  //-----------------------------------------------------------------------------------

  const editStartTime = async (startTime: string) => {
    const body = {
      workRecordId: workRecordId,
      startTime: startTime,
    };

    await axios.post("/api/works/starts", body);
  };

  //-----------------------------------------------------------------------------------

  const editEndTime = async (endTime: string) => {
    const workTime = workingTime(startTime, endTime);
    const body = {
      workRecordId: workRecordId,
      endTime: endTime,
      workingTime: workTime,
      overTime: null,
    };
    await axios.post("/api/works/ends", body);
  };

  //-----------------------------------------------------------------------------------

  return (
    <Group justify="center" gap="120">
      <ModalTimeEdit title="出勤時間編集" time={startTime} size="md">
        <Input
          value={startTimeInput}
          placeholder="時間を入力"
          onChange={e => setStartTimeInput(e.target.value)}
        />
        <ButtonBasic
          click={() => {
            setStartTime(startTimeInput);
            editStartTime(startTimeInput);
          }}
        >
          SAVE
        </ButtonBasic>
      </ModalTimeEdit>

      <ModalTimeEdit title="退勤時間編集" time={endTime} size="md">
        <Input
          value={endTimeInput}
          placeholder="時間を入力"
          onChange={e => setEndTimeInput(e.target.value)}
        />
        <ButtonBasic
          click={() => {
            setEndTime(endTimeInput);
            editEndTime(endTimeInput);
          }}
        >
          SAVE
        </ButtonBasic>
      </ModalTimeEdit>
    </Group>
  );
};
