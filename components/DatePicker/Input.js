import Image from "next/image";

import { useDatePicker } from "./context";
import { processDate } from "../../utilities/processDate";

export function Input() {
  const { date } = useDatePicker();

  const value = processDate(date);

  return (
    <>
      <span>{value}</span>
      <Image src="/icon-calendar.svg" alt="" height="16" width="16" />
    </>
  );
}
