import React from "react";

import { processDate } from "../../utilities/processDate";

const DateContext = React.createContext();

function DateProvider({ children, onDateChange, initialDate = new Date() }) {
  const initialState = {
    date: initialDate,
    dateString: processDate(initialDate),
  };

  function reducer(state, action) {
    switch (action.type) {
      case "increment_month": {
        const currentDate = new Date(state.date);
        const currentMonth = currentDate.getMonth();

        const date = new Date(currentDate.setMonth(currentMonth + 1));
        const dateString = processDate(date);

        return {
          date,
          dateString,
        };
      }
      case "decrement_month": {
        const currentDate = new Date(state.date);
        const currentMonth = currentDate.getMonth();

        const date = new Date(currentDate.setMonth(currentMonth - 1));
        const dateString = processDate(date);

        return {
          date,
          dateString,
        };
      }
      case "set_date": {
        const { date } = action.payload;
        const currentDate = new Date(state.date);

        const newDate = new Date(currentDate.setDate(date));
        const dateString = processDate(newDate);

        return {
          date: newDate,
          dateString,
        };
      }

      default:
        break;
    }
  }

  const activeIndexRef = React.useRef(-1);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // Invoke callback when the date changes to update form state
  React.useEffect(() => {
    onDateChange(state.date);
  }, [onDateChange, state.date]);

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

      if (active) {
        activeIndexRef.current = i;
      }

      dateArray.push({
        key: currentDate.toDateString(),
        date,
        day: currentDay,
        disabled,
        active,
      });

      currentDate.setDate(currentDay + 1);
      date++;
    }

    return dateArray;
  }, [state.date]);

  const value = {
    date: state.date,
    dateString: state.dateString,
    dispatch,
    createDateArray,
    activeIndexRef,
  };

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
}

function useDatePicker() {
  const context = React.useContext(DateContext);

  return context;
}

export { useDatePicker, DateProvider };
