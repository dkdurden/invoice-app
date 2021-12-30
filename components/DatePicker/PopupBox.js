import Image from "next/image";

import { Grid } from "./Grid";
import { useDatePicker } from "./context";
import { processDate } from "../../utilities/processDate";
import styles from "./DatePicker.module.scss";

export function PopupBox() {
  const { date, dispatch, showPopup } = useDatePicker();
  if (showPopup)
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
            <Image
              src="/icon-arrow-right.svg"
              alt=""
              width={"6"}
              height={"8"}
            />
          </button>
        </div>

        <Grid />
      </div>
    );
  else return null;
}
