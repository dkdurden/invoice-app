import { useState, useEffect } from "react";

// Does not work on first load of site
export function useWindowSize() {
  const [width, setWidth] = useState(null);

  useEffect(() => {
    if (window !== undefined) {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        return window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return width;
}
