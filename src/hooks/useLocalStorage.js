import React, { useCallback } from 'react';

const useLocalStorage = (key) => {
  const [item, setItem] = React.useState();

  const getItem = useCallback(() => {
    return JSON.parse(localStorage.getItem(key));
  }, [item]);

  const saveItem = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setItem(value);
  }

  const deleteItem = () => {
    localStorage.removeItem(key);
  }

  return {
    getItem,
    saveItem,
    deleteItem,
  };
}

export { useLocalStorage };
