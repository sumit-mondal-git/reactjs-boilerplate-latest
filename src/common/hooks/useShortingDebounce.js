import React, { useEffect, useState } from 'react';

const useShortingDebounce = (value, list, delay) => {
  const [finalList, setfinalList] = useState([]);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (list && value.length > 0 && list.length > 0) {
        setfinalList(
          list.filter((_item) => {
            if (_item.question.toLowerCase()?.includes(value.toLowerCase())) {
              return _item;
            }
          })
        );
      }
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, list]);
  return finalList;
};

export default useShortingDebounce;
