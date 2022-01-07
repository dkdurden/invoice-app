import { Fragment } from "react";
import { Popover } from "@headlessui/react";
import cn from "classnames";

import { DateProvider, useDatePicker } from "./context";
import { Input } from "./Input";
import { PopupBox } from "./PopupBox";
import styles from "./DatePicker.module.scss";

export function DatePicker() {
  return (
    <DateProvider>
      <Popover className={styles.container}>
        <Popover.Button as={Fragment}>
          {({ open }) => (
            <button
              className={cn(styles.input, `${open ? styles.focus : ""}`)}
              aria-label="Select a date"
            >
              <Input />
            </button>
          )}
        </Popover.Button>

        <Popover.Panel>
          {({ close }) => <PopupBox close={close} />}
        </Popover.Panel>
      </Popover>
    </DateProvider>
  );
}
