import { ActionIcon } from "@mantine/core";
import axios from "axios";
import { IoTrash } from "react-icons/io5";
import styles from "./Home.module.css";

type Props = {
  workRecordId: null | number;
  dataGet: () => Promise<void>;
};

export const HomeDelete = ({ workRecordId, dataGet }: Props) => {
  const deleteBtn = async () => {
    const body = {
      workRecordId: workRecordId,
    };
    await axios.delete("/api/works", { data: body });
    await dataGet();
  };

  return (
    <ActionIcon
      variant="transparent"
      size="lg"
      radius="xs"
      aria-label="Settings"
      className={styles.delete_btn}
      onClick={deleteBtn}
    >
      <IoTrash size={50} />
    </ActionIcon>
  );
};
