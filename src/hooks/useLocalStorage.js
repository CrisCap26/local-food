import React, { useCallback, useEffect } from 'react';

const useLocalStorage = (key) => {
  const [item, setItem] = React.useState(null);

  const getItem = useCallback(() => {
    return JSON.parse(localStorage.getItem(key));
  }, [item]);

  useEffect(() => {
    if (item === null) {
      setItem(JSON.parse(localStorage.getItem(key)));
    }
  }, []);

  const saveItem = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setItem(value);
  }

  const deleteItem = () => {
    localStorage.removeItem(key);
    setItem(null);
  }

  return {
    item,
    getItem,
    saveItem,
    deleteItem,
  };
}

export { useLocalStorage };
