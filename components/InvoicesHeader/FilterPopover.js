import Image from "next/image";
import React from "react";
import { Popover } from "@headlessui/react";

import styles from "./InvoicesHeader.module.scss";

export function FilterPopover() {
  return (
    <Popover as={React.Fragment}>
      {({ open }) => (
        <div
          className={styles.popover}
          style={{ borderLeft: open ? "1px solid black" : null }}
        >
          <Popover.Button as={"div"} className={styles.dropdown}>
            {({ open }) => (
              <button>
                <span className={styles.text}>Filter</span>
                <span>
                  <Image
                    src={"/icon-arrow-down.svg"}
                    alt=""
                    width={"12.69"}
                    height={"7.5"}
                    className={open ? "inverted" : null}
                  />
                </span>
              </button>
            )}
          </Popover.Button>

          <Popover.Panel className={styles.menu}>
            <div className="checkbox">
              <input type="checkbox" id="draft-filter" />
              <label htmlFor="draft-filter" className="h4">
                Draft
              </label>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="pending-filter" />
              <label htmlFor="pending-filter" className="h4">
                Pending
              </label>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="paid-filter" />
              <label htmlFor="paid-filter" className="h4">
                Paid
              </label>
            </div>
          </Popover.Panel>
        </div>
      )}
    </Popover>
  );
}
