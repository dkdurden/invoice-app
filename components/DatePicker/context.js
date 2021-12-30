import React from "react";

const DateContext = React.createContext();

function DateProvider({ children }) {
  const initialState = {
    date: new Date(),
    showPopup: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "increment_month": {
        const currentDate = new Date(state.date);
        const currentMonth = currentDate.getMonth();

        return {
          date: new Date(currentDate.setMonth(currentMonth + 1)),
        };
      }
      case "decrement_month": {
        const currentDate = new Date(state.date);
        const currentMonth = currentDate.getMonth();

        return {
          date: new Date(currentDate.setMonth(currentMonth - 1)),
        };
      }
      case "set_date": {
        const { date } = action.payload;
        const currentDate = new Date(state.date);

        return {
          date: new Date(currentDate.setDate(date)),
        };
      }

      case "toggle_popup": {
        return {
          showPopup: !state.showPopup,
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
    showPopup: state.showPopup,
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
