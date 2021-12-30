import React from "react";

import { useDatePicker } from "./context";
import styles from "./DatePicker.module.scss";
import { focusElement, unfocusElement } from "../../utilities/dom";

export function useGrid() {
  const { dispatch, activeIndexRef, date } = useDatePicker();
  const gridRef = React.useRef(null);

  React.useEffect(() => {
    if (!gridRef.current) return;

    const focusDayBox = (newIndex) => {
      const currentDay = selectDayBox(activeIndexRef.current);

      // No index passed in so focus the current day box
      if (newIndex == null) {
        return focusElement(currentDay, styles.active);
      }

      const newDay = selectDayBox(newIndex);

      // The new day box is not in the current grid
      if (newDay == null) {
        // Determine which way to change the date - forwards or backwards
        const step = newIndex < activeIndexRef.current ? -7 : 7;

        dispatch({
          type: "set_date",
          payload: {
            date: parseInt(currentDay.innerText) + step,
          },
        });
      }
      // The new day box is in the current grid, but is disabled
      else if (newDay.disabled) {
        dispatch({
          type: "set_date",
          payload: {
            date: newDay.dataset.date,
          },
        });
      } else {
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
          e.preventDefault();

          // Focus first day of current week
          focusDayBox(activeIndexRef.current - (activeIndexRef.current % 7));
          return;

        case "End":
          e.preventDefault();

          // Focus last day of current week
          focusDayBox(
            activeIndexRef.current - (activeIndexRef.current % 7) + 6
          );
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
  }, [activeIndexRef, dispatch, date]);

  function selectDayBox(index) {
    return gridRef.current.querySelector(`#day-box-${index}`);
  }

  return gridRef;
}
