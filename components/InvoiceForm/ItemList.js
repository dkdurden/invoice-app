import Image from "next/image";
import React from "react";
import cn from "classnames";

import { FormGroup } from "./FormGroup";
import { Label } from "./Label";
import styles from "./ItemList.module.scss";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export function ItemList({ items, addItem, deleteItem, handleItemChange }) {
  const aboveBreakpoint = useMediaQuery(768);

  return (
    <>
      <p className={styles.heading}>Item List</p>

      {aboveBreakpoint ? (
        <ItemsLG
          items={items}
          handleItemChange={handleItemChange}
          deleteItem={deleteItem}
        />
      ) : (
        <ItemsSM
          items={items}
          handleItemChange={handleItemChange}
          deleteItem={deleteItem}
        />
      )}

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

function ItemsLG({ items, handleItemChange, deleteItem }) {
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

      {items.map((item, index) => (
        <div className={styles.row_lg} key={item.id}>
          <FormGroup>
            <input
              aria-labelledby="item-name"
              type="text"
              name="name"
              onChange={handleItemChange}
              data-index={index}
            />
          </FormGroup>

          <FormGroup>
            <input
              aria-labelledby="item-quantity"
              type="text"
              name="quantity"
              onChange={handleItemChange}
              data-index={index}
              className={styles.qty}
            />
          </FormGroup>

          <FormGroup>
            <input
              aria-labelledby="item-price"
              type="text"
              name="price"
              onChange={handleItemChange}
              data-index={index}
            />
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
            <button type="button" onClick={deleteItem} data-index={index}>
              <Image src="/icon-delete.svg" alt="" width="12.44" height="16" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

// For smaller screens
function ItemsSM({ items, handleItemChange }) {
  return (
    <>
      {items.map((item, index) => (
        <div className={styles.row_sm} key={item.id}>
          <FormGroup>
            <Label htmlFor="item-name">Item Name</Label>
            <input
              id="item-name"
              type="text"
              onChange={handleItemChange}
              data-index={index}
            />
          </FormGroup>

          <div className={styles.subgroup}>
            <FormGroup>
              <Label htmlFor="item-quantity">Qty.</Label>
              <input
                id="item-quantity"
                type="text"
                onChange={handleItemChange}
                data-index={index}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="item-price">Price</Label>
              <input
                id="item-price"
                type="text"
                onChange={handleItemChange}
                data-index={index}
              />
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
