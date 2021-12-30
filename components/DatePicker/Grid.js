import { DayBox } from "./DayBox";
import { useDatePicker } from "./context";
import styles from "./DatePicker.module.scss";
import { useGrid } from "./useGrid";

export function Grid() {
  const { date, createDateArray } = useDatePicker();

  const gridRef = useGrid();

  return (
    <div className={styles.grid} ref={gridRef}>
      {createDateArray(date).map((day, index) => {
        return <DayBox day={day} key={index} index={index} />;
      })}
    </div>
  );
}
