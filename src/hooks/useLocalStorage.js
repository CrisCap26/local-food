import React from 'react';

const useLocalStorage = (key) => {
  const [item, setItem] = React.useState();

  const getItem = () => {
    return item;
  }

  const saveItem = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setItem(value);
  }

  return {
    getItem,
    saveItem,
  };
}

export { useLocalStorage };
