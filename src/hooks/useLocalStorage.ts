import { useState } from "react";

const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn("Error reading localStorage key:", key, error);
      return defaultValue;
    }
  });

  const storeValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Error setting localStorage key:", key, error);
    }
  };

  return { storedValue, storeValue };
};

export default useLocalStorage;
