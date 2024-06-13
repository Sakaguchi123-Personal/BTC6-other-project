import { Center, Flex, Stack, Title } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DrawerBottom, NavigateBar } from "../../components";
import styles from "./Home.module.css";

import {
  HomeButtonGroup,
  HomeDelete,
  HomeModalGroup,
  HomeRealtimeDisplay,
  HomeSegmentedControl,
  HomeSelectBarDate,
} from "./index";

export const Home = React.memo(() => {
  //!state多すぎる問題(どうにかしたい)
  const [date, setDate] = useState<Date>(new Date());
  const [barDisplayDate, setBarDisplayDate] = useState<string>("");
  const [displayDate, setDisplayDate] = useState<string>("");
  const [time, setTime] = useState(
    ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2)
  );
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startTimeInput, setStartTimeInput] = useState<string>("");
  const [endTimeInput, setEndTimeInput] = useState<string>("");
  const [homeOrOffice, setHomeOrOffice] = useState("0");
  const [workRecordId, setWorkRecordId] = useState(null);
  //-----------------------------------------------------------------------------------

  const dateFormat = () => {
    const y = date.getFullYear();
    const m = ("00" + (date.getMonth() + 1)).slice(-2);
    const d = ("00" + date.getDate()).slice(-2);
    const YearMonthDay = y + "年" + m + "月" + d + "日";
    const MonthDay = m + "月" + d + "日";
    setBarDisplayDate(YearMonthDay);
    setDisplayDate(MonthDay);
  };
  //-----------------------------------------------------------------------------------
  const dataGet = async () => {
    if (barDisplayDate !== "") {
      const res = await axios.get(`/api/dates?date=${barDisplayDate}`).then(res => res.data);
      if (res.length > 0) {
        const data = res[0];
        setWorkRecordId(data.workRecordId);
        setStartTime(data.startTime);
        setStartTimeInput(data.startTime);
        setEndTime(data.endTime);
        setEndTimeInput(data.endTime);
        setHomeOrOffice(String(data.officeHome));
      } else {
        setWorkRecordId(null);
        setStartTime("");
        setStartTimeInput("");
        setEndTime("");
        setEndTimeInput("");
        setHomeOrOffice("0");
      }
    }
  };
  //-----------------------------------------------------------------------------------

  useEffect(() => {
    (async () => {
      dateFormat();
      dataGet();
    })();
  }, [barDisplayDate]);

  return (
    <>
      <HomeSelectBarDate
        date={date}
        setDate={setDate}
        dateFormat={dateFormat}
        barDisplayDate={barDisplayDate}
      />
      {/* ----------------------------------------------------------------------------------- */}
      <Flex>
        <HomeSegmentedControl
          workRecordId={workRecordId}
          homeOrOffice={homeOrOffice}
          setHomeOrOffice={setHomeOrOffice}
        />
        {/* ----------------------------------------------------------------------------------- */}

        <HomeDelete workRecordId={workRecordId} dataGet={dataGet} />
      </Flex>
      {/* ----------------------------------------------------------------------------------- */}
      <Stack align="center" justify="center" m={"50px 0px 50px 0px"}>
        <Title order={1} m={"0px 0px 20px 0px"}>
          {displayDate}
        </Title>
        <HomeRealtimeDisplay time={time} setTime={setTime} />
      </Stack>
      {/* ----------------------------------------------------------------------------------- */}
      <HomeButtonGroup
        setStartTime={setStartTime}
        setStartTimeInput={setStartTimeInput}
        setEndTime={setEndTime}
        setEndTimeInput={setEndTimeInput}
        workRecordId={workRecordId}
        setWorkRecordId={setWorkRecordId}
        time={time}
        startTime={startTime}
        endTime={endTime}
        barDisplayDate={barDisplayDate}
        homeOrOffice={homeOrOffice}
      />
      {/* ----------------------------------------------------------------------------------- */}
      <HomeModalGroup
        setStartTime={setStartTime}
        setStartTimeInput={setStartTimeInput}
        setEndTime={setEndTime}
        setEndTimeInput={setEndTimeInput}
        workRecordId={workRecordId}
        startTime={startTime}
        startTimeInput={startTimeInput}
        endTime={endTime}
        endTimeInput={endTimeInput}
      />
      {/* ----------------------------------------------------------------------------------- */}

      <Center>
        <DrawerBottom className={styles.drawer} />
        <NavigateBar select="home" className={styles.nav_bar} />
      </Center>
    </>
  );
});
