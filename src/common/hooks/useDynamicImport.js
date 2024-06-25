// useDynamicImport.js

import { useEffect, useState } from 'react';

function useDynamicImport(pathname) {
  const [dynamicComponent, setDynamicComponent] = useState(null);

  useEffect(() => {
    // Use dynamic import to load the component associated with the pathname
    import(`./${pathname}`)
      .then((module) => {
        setDynamicComponent(() => module.default);
      })
      .catch((error) => {
        console.error(`Error loading component for path '${pathname}':`, error);
      });
  }, [pathname]);

  return dynamicComponent;
}

export default useDynamicImport;
