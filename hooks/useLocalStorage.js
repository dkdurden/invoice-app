import React from "react";

export default function useLocalStorage(key, defaultValue) {
  const [state, setState] = React.useState(null);

  React.useEffect(() => {
    setState(localStorage.getItem(key) || defaultValue);
  }, [key, defaultValue]);

  const update = (newValue) => {
    setState(newValue);
    localStorage.setItem(key, newValue);
  };

  return [state, update];
}
