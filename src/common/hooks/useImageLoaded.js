import { useEffect, useState, useRef } from 'react';
const useImageLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();

  const onImageLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onImageLoad();
    }
  });

  return [ref, loaded, onImageLoad];
};
export default useImageLoaded;
