import { Button } from "@mantine/core";
import { MouseEventHandler } from "react";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  click?: MouseEventHandler<HTMLButtonElement>;
  size?: string;
  className?: string;
};

export const ButtonBasic = ({ children, disabled, click, size, className }: Props) => {
  return (
    <Button disabled={disabled} m={5} radius={8} onClick={click} size={size} className={className}>
      {children}
    </Button>
  );
};
