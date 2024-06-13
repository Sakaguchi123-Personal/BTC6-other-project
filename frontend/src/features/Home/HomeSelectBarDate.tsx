import React from "react";
import { SelectBarDate } from "../../components";

type Props = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  dateFormat: () => void;
  barDisplayDate: string;
};

export const HomeSelectBarDate = React.memo(
  ({ date, setDate, dateFormat, barDisplayDate }: Props) => {
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
