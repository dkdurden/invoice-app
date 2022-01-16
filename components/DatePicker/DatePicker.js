import { Fragment } from "react";
import { Popover } from "@headlessui/react";
import cn from "classnames";

import { DateProvider } from "./context";
import { Input } from "./Input";
import { PopupBox } from "./PopupBox";
import styles from "./DatePicker.module.scss";

export function DatePicker(props) {
  return (
    <DateProvider>
      <Popover className={styles.container}>
        <Popover.Button as={Fragment}>
          {({ open }) => (
            <button
              className={cn(styles.input, `${open ? styles.focus : ""}`)}
              aria-label="Select a date"
              {...props}
            >
              <Input />
            </button>
          )}
        </Popover.Button>

        <Popover.Panel>
          {({ close }) => (
            <div className={styles.popupContainer}>
              <PopupBox close={close} />
            </div>
          )}
        </Popover.Panel>
      </Popover>
    </DateProvider>
  );
}
