import Image from "next/image";
import React, { Fragment } from "react";
import { Listbox } from "@headlessui/react";
import cn from "classnames";

import { toggle, menu, option, focus } from "./CustomSelect.module.scss";

function Select({ children, value, onChange }) {
  const optionsRef = React.useRef(null);

  const onFocus = () => {
    if (optionsRef.current) optionsRef.current.scrollIntoView();
  };

  return (
    <Listbox as="div" value={value} onChange={onChange}>
      <Listbox.Button as={Fragment}>
        {({ open }) => (
          <button className={cn(toggle, `${open ? focus : ""}`)}>
            {value}{" "}
            <Image
              src="/icon-arrow-down.svg"
              alt=""
              width={"12.69"}
              height={"7.5"}
            />
          </button>
        )}
      </Listbox.Button>

      <Listbox.Options ref={optionsRef} className={menu} onFocus={onFocus}>
        {children}
      </Listbox.Options>
    </Listbox>
  );
}

function Option({ children, value }) {
  return (
    <Listbox.Option className={option} value={value}>
      {children}
    </Listbox.Option>
  );
}

export const CustomSelect = Object.assign(Select, {
  Option: Option,
});
