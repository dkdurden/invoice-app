import { useState, useEffect, useCallback } from "react";

// See https://github.com/vercel/next.js/discussions/14810#discussioncomment-61177
export function useMediaQuery(width) {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback(
    (e) => {
      if (e.matches) {
        !targetReached && setTargetReached(true);
      } else {
        targetReached && setTargetReached(false);
      }
    },
    [targetReached]
  );

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, [width, updateTarget]);

  return targetReached;
}
