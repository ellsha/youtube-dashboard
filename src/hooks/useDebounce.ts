import { useCallback, useRef } from "react";

/**
 * Hook that returns a debounced version of a function
 * It delays a function call until no new calls occur within the provided time
 * E.g. in a search bar, instead of running a search func on every keystroke,
 * it waits until the user pauses typing.
 *
 * @param func - function to debounce
 * @param delay - delay in milliseconds
 */
function useDebounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number,
): (...args: Args) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => func(...args), delay);
    },
    [func, delay],
  );
}

export default useDebounce;
