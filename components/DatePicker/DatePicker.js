import { DateProvider, useDatePicker } from "./context";
import { Input } from "./Input";
import { PopupBox } from "./PopupBox";
import styles from "./DatePicker.module.scss";

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
