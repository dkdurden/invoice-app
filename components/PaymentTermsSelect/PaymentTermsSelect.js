import React from "react";

import { CustomSelect } from "../CustomSelect/CustomSelect";

const defaultValue = "Net 30 Days";

export function PaymentTermsSelect() {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <CustomSelect value={value} onChange={setValue}>
      <CustomSelect.Option value="Net 1 Day">
        <span className="h4">Net 1 Day</span>
      </CustomSelect.Option>
      <CustomSelect.Option value="Net 7 Days">
        <span className="h4">Net 7 Days</span>
      </CustomSelect.Option>
      <CustomSelect.Option value="Net 14 Days">
        <span className="h4">Net 14 Days</span>
      </CustomSelect.Option>
      <CustomSelect.Option value="Net 30 Days">
        <span className="h4">Net 30 Days</span>
      </CustomSelect.Option>
    </CustomSelect>
  );
}
