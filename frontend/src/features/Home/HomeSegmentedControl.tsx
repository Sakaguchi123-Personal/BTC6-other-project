import { SegmentedControl } from "@mantine/core";
import axios from "axios";
import { useEffect } from "react";
import styles from "./Home.module.css";

type Props = {
  homeOrOffice: string;
  setHomeOrOffice: React.Dispatch<React.SetStateAction<string>>;
  workRecordId: null | number;
};

export const HomeSegmentedControl = ({ homeOrOffice, setHomeOrOffice, workRecordId }: Props) => {
  useEffect(() => {
    (async () => {
      const body = {
        workRecordId: workRecordId,
        officeHome: homeOrOffice,
      };
      await axios.post("/api/works/office-home", body).then(res => res.data);
    })();
  }, [homeOrOffice, workRecordId]);
  //-----------------------------------------------------------------------------------

  return (
    <SegmentedControl
      className={styles.toggle_switch}
      color="brand"
      value={homeOrOffice}
      onChange={setHomeOrOffice}
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
  );
};
