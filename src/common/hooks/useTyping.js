import React from 'react';

const useTyping = ({ text, delay = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const animationRef = useRef(null);
  const indexRef = useRef(0);

  const animate = (timestamp) => {
    if (indexRef.current < text.length) {
      setDisplayedText(text.substring(0, indexRef.current + 1));
      indexRef.current += 1;
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [displayedText]);

  React.useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return [displayedText];
};
export default useTyping;
