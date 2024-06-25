import React, { useState, useEffect, useCallback } from 'react';

const useCountdownState = (interval, onTimeOver) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const start = useCallback((duration) => {
    setIsActive(true);
    setIsPaused(false);
    setTimeLeft(duration);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(0);
  }, []);

  const pause = useCallback(() => {
    setIsActive(false);
    setIsPaused(true);
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(0);
  }, []);

  const resume = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
  }, []);

  const isOver = useCallback(() => {
    return timeLeft === 0;
  }, [timeLeft]);

  useEffect(() => {
    let intervalId=null

    if (isActive && !isPaused && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - interval);
      }, interval);
    } else if (isActive && !isPaused && timeLeft === 0) {
      onTimeOver();
    } else {
      intervalId && clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isActive, isPaused, timeLeft, interval]);

  return { start, stop, pause, reset, resume, timeLeft, isOver };
};

export default useCountdownState;
