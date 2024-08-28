import { useState, useEffect } from 'react';

export const useLocalStorage = (key) => {

  const [value, setValue] = useState(localStorage.getItem(key));

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        setValue(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  const updateValue = (newValue) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, updateValue];
}