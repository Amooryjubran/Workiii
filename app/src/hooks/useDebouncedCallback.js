import { useCallback, useRef } from "react";

function useDebouncedCallback(callback, delay) {
  const functionTimeoutHandler = useRef(null);

  const debouncedFunction = useCallback(
    (...args) => {
      clearTimeout(functionTimeoutHandler.current);

      functionTimeoutHandler.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay] // Recreate only if callback or delay changes
  );

  return debouncedFunction;
}

export default useDebouncedCallback;
