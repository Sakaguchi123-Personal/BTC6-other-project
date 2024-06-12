import React from "react";
import { SelectBarDate } from "../../components";

type Props = {
  barDisplayDate: string;
  date: Date;
  dateFormat: () => void;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

export const HomeSelectBarDate = React.memo(
  ({ barDisplayDate, date, dateFormat, setDate }: Props) => {
    return (
      <SelectBarDate
        title={barDisplayDate}
        clickLeftArrow={() => {
          const initDate = date;
          initDate?.setDate(initDate?.getDate() - 1);
          setDate(initDate);
          dateFormat();
        }}
        clickRightArrow={() => {
          const initDate = date;
          initDate?.setDate(initDate?.getDate() + 1);
          setDate(initDate);
          dateFormat();
        }}
      />
    );
  }
);
