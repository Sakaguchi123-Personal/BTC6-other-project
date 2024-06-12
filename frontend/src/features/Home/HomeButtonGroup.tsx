import { Group } from "@mantine/core";
import axios from "axios";
import { ButtonBasic } from "../../components";

type Props = {
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  setStartTimeInput: React.Dispatch<React.SetStateAction<string>>;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  setEndTimeInput: React.Dispatch<React.SetStateAction<string>>;
  setWorkRecordId: React.Dispatch<React.SetStateAction<null>>;
  time: string;
  workRecordId: number | null;
  barDisplayDate: string;
  homeOrOffice: string;
  endTime: string;
  startTime: string;
};

export const HomeButtonGroup = ({
  setStartTime,
  setStartTimeInput,
  setEndTime,
  setEndTimeInput,
  setWorkRecordId,
  time,
  workRecordId,
  barDisplayDate,
  homeOrOffice,
  endTime,
  startTime,
}: Props) => {
  //-----------------------------------------------------------------------------------

  const post = async (time: string) => {
    const body = {
      userId: 1,
      workDate: barDisplayDate,
      officeHome: homeOrOffice,
      startTime: time,
      endTime: endTime,
      workingTime: null,
      overTime: null,
    };
    const res = await axios.post("/api/works", body).then(res => res.data);
    setWorkRecordId(res);
    console.log(workRecordId);
    console.log(res);
  };

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

  const patch = async (time: string) => {
    const workTime = workingTime(startTime, time);
    const body = {
      workRecordId: workRecordId,
      endTime: time,
      workingTime: workTime,
      overTime: null,
    };
    await axios.post("/api/works/ends", body);
  };
  //-----------------------------------------------------------------------------------

  return (
    <Group justify="center" gap="80" m={"20px 0px"}>
      <ButtonBasic
        size="xl"
        click={() => {
          setStartTime(time);
          setStartTimeInput(time);
          post(time);
        }}
        disabled={workRecordId === null ? false : true}
      >
        出勤
      </ButtonBasic>

      <ButtonBasic
        size="xl"
        click={() => {
          setEndTime(time);
          setEndTimeInput(time);
          patch(time);
        }}
        disabled={endTime === "" ? false : true}
      >
        退勤
      </ButtonBasic>
    </Group>
  );
};
