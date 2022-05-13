import React from "react";

import { CustomSelect } from "../CustomSelect/CustomSelect";

const defaultValue = 30;

const valueMap = {
  1: "Net 1 Day",
  7: "Net 7 Days",
  14: "Net 14 Days",
  30: "Net 30 Days",
};

export function PaymentTermsSelect({ paymentTermsState, updatePaymentTerms }) {
  // Local state for displaying options & active option properly
  // Doing it this way so that the actual numbers (1, 7, 14, 30) can be
  //  used for state & calculations, but the display can still be Net 1 Day, etc.
  const [value, setValue] = React.useState(
    valueMap[paymentTermsState || defaultValue]
  );

  const handleChange = (newValue) => {
    // Update the actual payment terms state
    updatePaymentTerms(newValue.match(/(\d\d?)/)[0]);

    // Update local state for display
    setValue(newValue);
  };

  return (
    <CustomSelect value={value} onChange={handleChange} name="paymentTerms">
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
