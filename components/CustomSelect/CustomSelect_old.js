import React from "react";
import Image from "next/image";

// Old - without headlessui
export function CustomSelect() {
  const listboxRef = React.useRef(null);
  const activeOptionRef = React.useRef(null);

  const [showListbox, setShowListbox] = React.useState(false);
  const [activeOption, setActiveOption] = React.useState(null);

  const toggleListbox = () => setShowListbox((prevState) => !prevState);

  const handleButtonClick = (e) => {
    if (showListbox) {
      e.target.classList.remove("focus");
      toggleListbox();
      return;
    }

    e.target.classList.add("focus");
    toggleListbox();
    return;
  };

  React.useEffect(() => {
    const press = (e) => {
      if (e.code === "ArrowUp") {
        e.preventDefault();
        const prevOption = activeOptionRef.current.previousElementSibling;

        if (!prevOption) return;

        activeOptionRef.current.setAttribute("aria-selected", false);
        prevOption.setAttribute("aria-selected", true);
        listboxRef.current.setAttribute("aria-activedescendant", prevOption.id);
        activeOptionRef.current = prevOption;
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        const nextOption = activeOptionRef.current.nextElementSibling;

        if (!nextOption) return;

        activeOptionRef.current.setAttribute("aria-selected", false);
        nextOption.setAttribute("aria-selected", true);
        listboxRef.current.setAttribute("aria-activedescendant", nextOption.id);
        activeOptionRef.current = nextOption;
      } else if (e.code === "Enter") {
        e.preventDefault();
        const menuBtn = listboxRef.current.previousElementSibling;
        toggleListbox();
        menuBtn.classList.remove("focus");
        menuBtn.firstChild.innerText = activeOptionRef.current.innerText;
        menuBtn.focus();
      }
    };

    const click = (e) => {
      if (e.target.id === "menubutton") return;

      const menuBtn = listboxRef.current.previousElementSibling;

      if (!e.target.closest("#listbox")) {
        toggleListbox();
        menuBtn.classList.remove("focus");
        return;
      }

      const option = e.target.closest("[role=option]");

      activeOptionRef.current.setAttribute("aria-selected", false);
      option.setAttribute("aria-selected", true);
      listboxRef.current.setAttribute("aria-activedescendant", option.id);
      activeOptionRef.current = option;

      // setActiveOption({
      //   text: option.innerText,
      //   id: option.id,
      // });

      menuBtn.firstChild.innerText = option.innerText;
      toggleListbox();
    };

    if (listboxRef.current) {
      listboxRef.current.scrollIntoView();
      listboxRef.current.focus();

      if (activeOptionRef.current) {
        // activeOptionRef.current = listboxRef.current.querySelector(
        //   `#${activeOption.id}`
        // );

        activeOptionRef.current.setAttribute("aria-selected", true);

        listboxRef.current.setAttribute(
          "aria-activedescendant",
          activeOptionRef.current.id
        );
      } else {
        listboxRef.current.firstElementChild.setAttribute(
          "aria-selected",
          true
        );

        listboxRef.current.setAttribute(
          "aria-activedescendant",
          listboxRef.current.firstElementChild.id
        );

        activeOptionRef.current = listboxRef.current.firstElementChild;
      }

      window.addEventListener("keydown", press);
      document.addEventListener("click", click);
    }

    return () => {
      window.removeEventListener("keydown", press);
      document.removeEventListener("click", click);
    };
  }, [showListbox]);

  return (
    <div className="custom-select">
      <button
        aria-expanded="false"
        aria-haspopup="true"
        id="menubutton"
        onClick={handleButtonClick}
      >
        <span>{activeOption?.text || "Select"}</span>
        <Image
          src="/icon-arrow-down.svg"
          alt=""
          width={"12.69"}
          height={"7.5"}
        />
      </button>
      {showListbox && (
        <ul
          role="listbox"
          id="listbox"
          className="custom-select__menu animate__animated animate__bounceInLeft"
          tabIndex="-1"
          ref={listboxRef}
        >
          <li
            role="option"
            aria-selected="false"
            className="custom-select__option"
            id="option1"
          >
            <span className="h4">Net 1 Day</span>
          </li>
          <li
            role="option"
            aria-selected="false"
            className="custom-select__option"
            id="option2"
          >
            <span className="h4">Net 7 Days</span>
          </li>
          <li
            role="option"
            aria-selected="false"
            className="custom-select__option"
            id="option3"
          >
            <span className="h4">Net 14 Days</span>
          </li>
          <li
            role="option"
            aria-selected="false"
            className="custom-select__option"
            id="option4"
          >
            <span className="h4">Net 30 Days</span>
          </li>
        </ul>
      )}
    </div>
  );
}
