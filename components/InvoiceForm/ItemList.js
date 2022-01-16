import Image from "next/image";
import React from "react";
import cn from "classnames";

import { FormGroup } from "./FormGroup";
import { Label } from "./Label";
import styles from "./ItemList.module.scss";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useModalState } from "../../context/app-context";
import { nanoid } from "nanoid";

export function ItemList() {
  const { invoiceData } = useModalState();

  const [items, setItems] = React.useState(
    createInitialState(invoiceData?.items)
  );
  const addItem = (e) => setItems((prevState) => [...prevState, {}]);

  const aboveBreakpoint = useMediaQuery(768);

  return (
    <>
      <p className={styles.heading}>Item List</p>

      {aboveBreakpoint ? <ItemsLG items={items} /> : <ItemsSM items={items} />}

      <button
        type="button"
        onClick={addItem}
        className={cn(styles.add, "button--wide")}
      >
        + Add Item
      </button>
    </>
  );
}

function ItemsLG({ items }) {
  return (
    <>
      <div className={styles.row_lg}>
        <p className={styles.label} id="item-name">
          Item Name
        </p>
        <p className={styles.label} id="item-quantity">
          Qty.
        </p>
        <p className={styles.label} id="item-price">
          Price
        </p>
        <p className={styles.label} id="item-total">
          Total
        </p>
      </div>

      {items.map((item) => (
        <div className={styles.row_lg} key={item.id}>
          <FormGroup>
            <input aria-labelledby="item-name" type="text" />
          </FormGroup>

          <FormGroup>
            <input aria-labelledby="item-quantity" type="text" />
          </FormGroup>

          <FormGroup>
            <input aria-labelledby="item-price" type="text" />
          </FormGroup>

          <FormGroup>
            <input
              aria-labelledby="item-total"
              type="text"
              readOnly
              value="400.00"
              className={styles.total}
            />
          </FormGroup>

          <div className={styles.icon}>
            <button type="button">
              <Image src="/icon-delete.svg" alt="" width="12.44" height="16" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

// For smaller screens
function ItemsSM({ items }) {
  console.log(items);
  return (
    <>
      {items.map((item) => (
        <div className={styles.row_sm} key={item.id}>
          <FormGroup>
            <Label htmlFor="item-name">Item Name</Label>
            <input id="item-name" type="text" />
          </FormGroup>

          <div className={styles.subgroup}>
            <FormGroup>
              <Label htmlFor="item-quantity">Qty.</Label>
              <input id="item-quantity" type="text" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="item-price">Price</Label>
              <input id="item-price" type="text" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="item-total">Total</Label>
              <input
                id="item-total"
                type="text"
                readOnly
                value="400.00"
                className={styles.total}
              />
            </FormGroup>

            <div>
              <button type="button" className="mt-3">
                <Image
                  src="/icon-delete.svg"
                  alt=""
                  width="12.44"
                  height="16"
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function createInitialState(items) {
  return items != null
    ? items.map((item) => ({
        ...item,
        id: nanoid(),
      }))
    : [];
}
