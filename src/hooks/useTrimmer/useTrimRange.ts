import { useEffect } from "react";
import useLocalStorage from "../useLocalStorage";

export interface TrimRange {
  start: number;
  end: number;
  setStart: (start: number) => void;
  setEnd: (end: number) => void;
}

const useTrimRange = (videoId: string, duration: number): TrimRange => {
  const startKey = `${videoId}:start`;
  const endKey = `${videoId}:end`;

  const {
    storedValue: start,
    storeValue: setStart,
    storeValueDebounced: debouncedSaveStart,
  } = useLocalStorage<number>(startKey, 0);
  const {
    storedValue: end,
    storeValue: setEnd,
    storeValueDebounced: debouncedSaveEnd,
  } = useLocalStorage<number>(endKey, 0);

  // refreshing trimmed end when player is loaded
  useEffect(() => {
    if (duration > 0 && end == 0) {
      setEnd(duration);
    }
  }, [setEnd, duration, end]);

  // saving to the local storage
  useEffect(() => {
    debouncedSaveStart(start);
    debouncedSaveEnd(end);
  }, [debouncedSaveEnd, debouncedSaveStart, end, start]);

  return { start, setStart, end, setEnd };
};

export default useTrimRange;
