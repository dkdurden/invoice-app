import Image from "next/image";
import React from "react";

import { Grid } from "./Grid";
import { useDatePicker } from "./context";
import { processDate } from "../../utilities/processDate";
import styles from "./DatePicker.module.scss";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export function PopupBox({ close }) {
  const popupBoxRef = React.useRef(null);
  const { date, dispatch } = useDatePicker();
  const aboveBreakpoint = useMediaQuery(768);

  // For increment/decrement buttons
  const width = aboveBreakpoint ? "6" : "12";
  const height = aboveBreakpoint ? "8" : "16";
  const style = { padding: "0 0.5rem" };

  const onFocus = () => {
    popupBoxRef.current.scrollIntoView();
  };

  const decrement = () => dispatch({ type: "decrement_month" });
  const increment = () => dispatch({ type: "increment_month" });

  return (
    <div ref={popupBoxRef} className={styles.popupBox} onFocus={onFocus}>
      <div className={styles.header}>
        <button onClick={decrement} onTouchStart={decrement} style={style}>
          <Image
            src="/icon-arrow-left.svg"
            alt=""
            width={width}
            height={height}
          />
        </button>
        <div>
          <span className="h4">{processDate(date, false)}</span>
        </div>

        <button onClick={increment} onTouchStart={increment} style={style}>
          <Image
            src="/icon-arrow-right.svg"
            alt=""
            width={width}
            height={height}
          />
        </button>
      </div>

      <Grid close={close} />
    </div>
  );
}
