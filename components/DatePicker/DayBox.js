import cn from "classnames";

import { useDatePicker } from "./context";
import styles from "./DatePicker.module.scss";

export function DayBox({ day, index, close }) {
  const { dispatch } = useDatePicker();

  function handleClick(e) {
    if (e.target.disabled) return;

    // const day = e.target.innerText;
    const { date } = e.target.dataset;

    dispatch({
      type: "set_date",
      payload: {
        date,
      },
    });

    close();
  }

  return (
    <button
      className={cn(styles.day, "h4", day.active ? styles.active : null)}
      key={day.key}
      id={`day-box-${index}`}
      disabled={day.disabled}
      data-date={day.date}
      onClick={handleClick}
    >
      {day.day}
    </button>
  );
}
