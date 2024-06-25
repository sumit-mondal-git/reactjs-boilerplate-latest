import React, { useCallback, useEffect, useState } from 'react';

const useScrollDirection = () => {
  const [y, setY] = useState(document.scrollingElement.scrollHeight);
  const [scrollDirection, setScrollDirection] = useState(0);
  //0 for no scroll, 1 for upwards, -1 for downwards

  const handleNavigation = useCallback(
    (e) => {
      if (y > window.scrollY) {
        setScrollDirection(1);
        console.log('scrolling up');
      } else if (y < window.scrollY) {
        setScrollDirection(-1);
        console.log('scrolling down');
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  return scrollDirection;
};

export default useScrollDirection;
