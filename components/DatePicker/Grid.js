import { DayBox } from "./DayBox";
import { useDatePicker } from "./context";
import styles from "./DatePicker.module.scss";
import { useGrid } from "./useGrid";

export function Grid({ close }) {
  const { date, createDateArray } = useDatePicker();

  const gridRef = useGrid(close);

  return (
    <div className={styles.grid} ref={gridRef}>
      {createDateArray(date).map((day, index) => {
        return <DayBox day={day} key={index} index={index} close={close} />;
      })}
    </div>
  );
}
