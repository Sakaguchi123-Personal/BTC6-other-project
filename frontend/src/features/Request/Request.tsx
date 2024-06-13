import { Center, Stack } from "@mantine/core";
import { NavigateBar } from "../../components";
import styles from "../../index.module.css";

export const Request = () => {
  return (
    <>
      <Stack align="center" justify="center" h={"100vh"}>
        <h2 className={styles.text}>Requestタブ 未実装</h2>
      </Stack>
      <Center>
        <NavigateBar className={styles.nav_bar} select="request" />
      </Center>
    </>
  );
};
