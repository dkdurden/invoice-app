import cn from "classnames";

import { FormGroup } from "./FormGroup";
import { Label } from "./Label";
import { DatePicker } from "../DatePicker/DatePicker";
import styles from "./InvoiceForm.module.scss";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { PaymentTermsSelect } from "../PaymentTermsSelect/PaymentTermsSelect";
import { ItemList } from "./ItemList";

export function InvoiceForm() {
  const aboveBreakpoint = useMediaQuery(768);

  return (
    <form>
      <p id="bill-from" className="h4 text-purple mb-3">
        Bill From
      </p>
      <div className={cn("mb-4", styles.grid)}>
        <FormGroup className={styles.wide}>
          <Label htmlFor="from-street-address">Street Address</Label>
          <input id="from-street-address" type="text" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="from-city">City</Label>
          <input id="from-city" type="text" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="from-post-code">Post Code</Label>
          <input id="from-post-code" type="text" />
        </FormGroup>

        <FormGroup className={!aboveBreakpoint ? styles.wide : null}>
          <Label htmlFor="from-country">Country</Label>
          <input id="from-country" type="text" />
        </FormGroup>
      </div>

      <p id="bill-from" className="h4 text-purple mb-3">
        Bill To
      </p>

      <div className={cn(styles.grid, "mb-4")}>
        <FormGroup className={styles.wide}>
          <Label htmlFor="client-name">Client&apos;s Name</Label>
          <input id="client-name" type="text" />
        </FormGroup>

        <FormGroup className={styles.wide}>
          <Label htmlFor="client-email">Client&apos;s Email</Label>
          <input
            id="client-email"
            placeholder="e.g. email@example.com"
            type="email"
          />
        </FormGroup>

        <FormGroup className={styles.wide}>
          <Label htmlFor="to-street-address">Street Adress</Label>
          <input id="to-street-address" type="text" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="to-city">City</Label>
          <input id="to-city" type="text" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="to-post-code">Post Code</Label>
          <input id="to-post-code" type="text" />
        </FormGroup>

        <FormGroup className={!aboveBreakpoint ? styles.wide : null}>
          <Label htmlFor="to-country">Country</Label>
          <input id="to-country" type="text" />
        </FormGroup>
      </div>

      <div className={cn(styles.grid__lg)}>
        <FormGroup className={!aboveBreakpoint ? styles.wide : null}>
          <Label id="invoice-date" as={"p"}>
            Invoice Date
          </Label>
          <DatePicker aria-describedby="invoice-date" />
        </FormGroup>

        <FormGroup className={!aboveBreakpoint ? styles.wide : null}>
          <Label id="payment-terms" as={"p"}>
            Payment Terms
          </Label>
          <PaymentTermsSelect />
        </FormGroup>

        <FormGroup className={styles.wide}>
          <Label htmlFor="project-description">Project Description</Label>
          <input
            id="project-description"
            placeholder="e.g. Graphic Design Service"
            type="text"
          />
        </FormGroup>
      </div>

      <ItemList />
    </form>
  );
}
