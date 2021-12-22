import React from "react";
import cn from "classnames";

import styles from "./DatePicker.module.scss";

export function DatePicker() {
  const [date, setDate] = React.useState({
    day: "",
    month: "",
    year: "",
  });

  React.useEffect(() => {
    const now = new Date("August 2021");

    console.log(now.getDay() + 1);

    setDate({
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    });
  }, []);

  function createDateArray(date) {
    const ret = [];
    const currentDate = date ? new Date(date) : new Date("August 2021");

    // Preserve initial values
    const initialDate = new Date(currentDate);
    const initialMonth = initialDate.getMonth();

    // Get the day of the week that the current month starts
    currentDate.setDate(1);
    const dayOfWeek = currentDate.getDay();

    const start = 1 - dayOfWeek;
    currentDate.setDate(start);

    while (ret.length < 35) {
      const currentDay = currentDate.getDate();
      const disabled = initialMonth !== currentDate.getMonth();
      const active = initialDate.toDateString() === currentDate.toDateString();
      ret.push({ day: currentDay, disabled, active });
      currentDate.setDate(currentDay + 1);
    }

    return ret;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          onClick={() =>
            setDate((date) => {
              const newDate = date;
              newDate.setMonth(date.getMonth() - 1);
              return newDate;
            })
          }
        >
          {"<"}
        </button>

        <div>
          <span className="h4">Aug</span>
          <span className="h4">2021</span>
        </div>

        <button>{">"}</button>
      </div>
      <div className={styles.grid}>
        {createDateArray().map((day, index) => {
          return (
            <button
              className={cn(
                styles.day,
                "h4",
                day.active ? styles.active : null
              )}
              key={index}
              id={`day-box-${index}`}
              disabled={day.disabled}
            >
              {day.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
