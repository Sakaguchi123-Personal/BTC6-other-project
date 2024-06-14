import { Accordion, Center, ScrollArea, SegmentedControl, Stack } from "@mantine/core";
import styled from "styled-components";
import styles from "../../index.module.css";

import { NavigateBar, SelectBarDate, TimeEdit } from "../../components";

export const Calender = () => {
  //--------------------------------------------------------------------------

  const testDate = [
    "01日",
    "02日",
    "03日",
    "04日",
    "05日",
    "06日",
    "07日",
    "08日",
    "09日",
    "10日",
    "11日",
    "12日",
  ];
  //--------------------------------------------------------------------------

  const items = testDate.map(item => (
    <Accordion.Item key={item} value={item}>
      <Accordion.Control>{item}</Accordion.Control>
      <Accordion.Panel>
        {
          <>
            <SegmentedControl
              className={styles.toggle_switch}
              color="brand"
              // value={homeOrOffice}
              // onChange={setHomeOrOffice}
              data={[
                {
                  label: "在宅",
                  value: "0",
                },
                {
                  label: "出社",
                  value: "1",
                },
              ]}
            />
            <TimeEdit startTime="08:00" endTime="18:00" startTitle="開始" endTitle="終了" />
          </>
        }
      </Accordion.Panel>
    </Accordion.Item>
  ));

  //--------------------------------------------------------------------------
  return (
    <>
      <Stack align="center" justify="center">
        <h2 className={styles.text}>calenderタブ 未完成</h2>
      </Stack>

      <SelectBarDate title={"2024年06月"} clickLeftArrow={() => {}} clickRightArrow={() => {}} />
      <StyleDiv>
        <StyleP>稼働日: 20日</StyleP>
        <StyleP>合計残業時間: 25:30</StyleP>
        <StyleP>残業指示:30:00</StyleP>
      </StyleDiv>

      <ScrollArea h={410} scrollbarSize={6}>
        <Accordion variant="separated" defaultValue="Apples" m={"20px"}>
          {items}
        </Accordion>
      </ScrollArea>

      <Center>
        <NavigateBar className={styles.nav_bar} select="calender" />
      </Center>
    </>
  );
};

const StyleDiv = styled.div`
  background-color: #ddb72d;
  border-radius: 25px;
  padding: 20px;
  margin: 0 30px;
`;
const StyleP = styled.p`
  margin: 0;
  color: white;
  font-size: 20px;
`;
