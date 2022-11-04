import React from 'react';

const useLocalStorage = (key) => {
  const [item, setItem] = React.useState();

  const saveItem = (value) => {
    const localStorageItem = localStorage.getItem(key);
    let parsedItem;

    if (!localStorageItem) {
      localStorage.setItem(key, JSON.stringify(value));
      parsedItem = value;
    } else {
      parsedItem = JSON.parse(localStorageItem);
    }

    setItem(parsedItem);
  }

  return {
    item,
    saveItem,
  };
}

export { useLocalStorage };
