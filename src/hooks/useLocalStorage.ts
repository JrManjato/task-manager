import { useState, useEffect } from 'react';

const isLocalStorageAvailable = () => {
  try {
    const testKey = 'smlfjmlj';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

const useLocalStorage = (key, initialValue) => {
  const isAvailable = isLocalStorageAvailable();
  const [value, setValue] = useState(() => {
    if (isAvailable) {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (isAvailable) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [isAvailable, key, value]);

  return [value, setValue];
};

export { useLocalStorage };
