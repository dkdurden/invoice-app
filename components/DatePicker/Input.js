import Image from "next/image";
import { useDatePicker } from "./context";

import styles from "./DatePicker.module.scss";
import { processDate } from "../../utilities/processDate";

export function Input() {
  const { date } = useDatePicker();

  const value = processDate(date);

  return (
    <div className={styles.inputContainer}>
      <input type="text" value={value} readOnly />
      <div className={styles.calendarContainer}>
        <button className={styles.calendar}>
          <Image src="/icon-calendar.svg" alt="" height="16" width="16" />
        </button>
      </div>
    </div>
  );
}
