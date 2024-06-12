import { Title } from "@mantine/core";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
};

export const HomeRealtimeDisplay = React.memo(({ time, setTime }: Props) => {
  const changeTime = () => {
    const dateTime = new Date();
    const nextTime =
      ("00" + dateTime.getHours()).slice(-2) + ":" + ("00" + dateTime.getMinutes()).slice(-2);
    setTime(nextTime);
  };
  setInterval(changeTime, 1000);

  return <Title order={2}>現在時刻 {time}</Title>;
});
