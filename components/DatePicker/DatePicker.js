import Image from "next/image";
import React from "react";
import cn from "classnames";

import styles from "./DatePicker.module.scss";
import { processDate } from "../../utilities/processDate";
import { focusElement, unfocusElement } from "../../utilities/dom";

const DateContext = React.createContext();

export function DatePicker() {
  return (
    <DateProvider>
      <div className={styles.container}>
        <Input />
        <PopupBox />
      </div>
    </DateProvider>
  );
}

function DateProvider({ children }) {
  const initialState = {
    date: new Date(),
  };

  // const day = e.target.innerText;
  // setDate((prevState) => {
  //   const current = new Date(prevState);
  //   current.setDate(day);
  //   return current;
  // });

  function reducer(state, action) {
    switch (action.type) {
      case "increment_month": {
        const currentDate = new Date(state.date);
        const currentMonth = currentDate.getMonth();

        return {
          date: currentDate.setMonth(currentMonth + 1),
        };
      }
      case "decrement_month": {
        const currentDate = new Date(state.date);
        const currentMonth = currentDate.getMonth();

        return {
          date: currentDate.setMonth(currentMonth - 1),
        };
      }
      case "set_date": {
        const { date } = action.payload;
        const currentDate = new Date(state.date);

        return {
          date: currentDate.setDate(date),
        };
      }

      default:
        break;
    }
  }

  const activeIndexRef = React.useRef(-1);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const createDateArray = React.useCallback(() => {
    const dateArray = [];
    const currentDate = new Date(state.date);

    // Preserve initial values
    const initialDate = new Date(currentDate);
    const initialMonth = initialDate.getMonth();

    // Get the day of the week that the current month starts
    currentDate.setDate(1);
    const dayOfWeek = currentDate.getDay();

    let date = 1 - dayOfWeek;
    currentDate.setDate(date);

    for (let i = 0; i < 42; i++) {
      const currentDay = currentDate.getDate();

      const disabled = initialMonth !== currentDate.getMonth();
      const active = initialDate.toDateString() === currentDate.toDateString();

      if (active) activeIndexRef.current = i;

      dateArray.push({ date, day: currentDay, disabled, active });

      currentDate.setDate(currentDay + 1);
      date++;
    }

    return dateArray;
  }, [state.date]);

  const value = {
    date: state.date,
    dispatch,
    createDateArray,
    activeIndexRef,
  };

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
}

function Input() {
  return (
    <div className={styles.inputContainer}>
      <input type="text" />
      <div className={styles.calendarContainer}>
        <div className={styles.calendar}>
          <Image src="/icon-calendar.svg" alt="" height="16" width="16" />
        </div>
      </div>
    </div>
  );
}

function PopupBox() {
  const { date, dispatch, activeIndexRef } = React.useContext(DateContext);

  return (
    <div className={styles.popupBox}>
      <div className={styles.header}>
        <button onClick={() => dispatch({ type: "decrement_month" })}>
          <Image src="/icon-arrow-left.svg" alt="" width={"6"} height={"8"} />
        </button>

        <div>
          <span className="h4">{processDate(date, false)}</span>
        </div>

        <button onClick={() => dispatch({ type: "increment_month" })}>
          <Image src="/icon-arrow-right.svg" alt="" width={"6"} height={"8"} />
        </button>
      </div>

      <Grid date={date} />
    </div>
  );
}

function Grid({ date }) {
  const { dispatch, createDateArray, activeIndexRef } =
    React.useContext(DateContext);

  const gridRef = React.useRef(null);

  React.useEffect(() => {
    if (!gridRef.current) return;

    const focusDayBox = (newIndex) => {
      const currentDay = gridRef.current.querySelector(
        `#day-box-${activeIndexRef.current}`
      );

      // No index passed in so focus the current day box
      if (!newIndex) {
        return focusElement(currentDay, styles.active);
      }

      const newDay = gridRef.current.querySelector(`#day-box-${newIndex}`);

      if (newDay && !newDay.disabled) {
        unfocusElement(currentDay, styles.active);
        focusElement(newDay, styles.active);
        activeIndexRef.current = newIndex;
      }
    };

    focusDayBox();

    const handleKeyDown = (e) => {
      switch (e.code) {
        case "ArrowUp":
          e.preventDefault();
          focusDayBox(activeIndexRef.current - 7);
          return;

        case "ArrowDown":
          e.preventDefault();
          focusDayBox(activeIndexRef.current + 7);
          return;

        case "ArrowLeft":
          e.preventDefault();
          focusDayBox(activeIndexRef.current - 1);
          return;

        case "ArrowRight":
          e.preventDefault();
          focusDayBox(activeIndexRef.current + 1);
          return;

        case "Home":
          return;

        case "Enter":
        case "Space":
          e.preventDefault();

          const currentDay = selectDayBox(activeIndexRef.current);
          dispatch({
            type: "set_date",
            payload: {
              day: currentDay.innerText,
            },
          });

          // handle more accessible behavior

          return;
        default:
          console.log(e.code);
          return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

    // Refs are static and safe to include for the sake of exhaustive deps
    // https://github.com/facebook/react/issues/20752#issuecomment-790055486
  }, [activeIndexRef, dispatch]);

  function selectDayBox(index) {
    return gridRef.current.querySelector(`#day-box-${index}`);
  }

  return (
    <div className={styles.grid} ref={gridRef}>
      {createDateArray(date).map((day, index) => {
        return <DayBox day={day} key={index} index={index} />;
      })}
    </div>
  );
}

function DayBox({ day, index }) {
  const { dispatch } = React.useContext(DateContext);

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
  }

  return (
    <button
      className={cn(styles.day, "h4", day.disabled ? styles.disabled : null)}
      key={index}
      id={`day-box-${index}`}
      disabled={day.disabled}
      data-date={day.date}
      onClick={handleClick}
    >
      {day.day}
    </button>
  );
}
