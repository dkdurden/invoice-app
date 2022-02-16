import Image from "next/image";

import { useDatePicker } from "./context";

export function Input() {
  const { dateString } = useDatePicker();

  return (
    <>
      <span>{dateString}</span>
      <Image src="/icon-calendar.svg" alt="" height="16" width="16" />
    </>
  );
}
