import React from 'react';

const useCountDown = (timeToCount = 5 * 1000, interval = 1000) => {
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [over, setOver] = React.useState(false);

  const timer = React.useRef({});

  const run = (ts) => {
    if (!timer.current.started) {
      setOver(false);
      timer.current.started = ts;
      timer.current.lastInterval = ts;
    }

    const localInterval = Math.min(interval, timer.current.timeLeft || Infinity);
    if (ts - timer.current.lastInterval >= localInterval) {
      timer.current.lastInterval += localInterval;
      setTimeLeft((timeLeft) => {
        timer.current.timeLeft = timeLeft - localInterval;
        return timer.current.timeLeft;
      });
    }

    if (ts - timer.current.started < timer.current.timeToCount) {
      timer.current.requestId = window.requestAnimationFrame(run);
    } else {
      timer.current = {};
      setTimeLeft(-1); //0
      setOver(true);
    }
  };

  const start = React.useCallback((ttc) => {
    window.cancelAnimationFrame(timer.current.requestId);

    const newTimeToCount = ttc !== undefined ? ttc : timeToCount;
    timer.current.started = null;
    timer.current.lastInterval = null;
    timer.current.timeToCount = newTimeToCount;
    timer.current.requestId = window.requestAnimationFrame(run);

    setTimeLeft(newTimeToCount);
  }, []);

  const pause = React.useCallback(() => {
    window.cancelAnimationFrame(timer.current.requestId);
    timer.current.started = null;
    timer.current.lastInterval = null;
    timer.current.timeToCount = timer.current.timeLeft;
  }, []);

  const resume = React.useCallback(() => {
    if (!timer.current.started && timer.current.timeLeft > 0) {
      window.cancelAnimationFrame(timer.current.requestId);
      timer.current.requestId = window.requestAnimationFrame(run);
    }
  }, []);

  const reset = React.useCallback(() => {
    if (timer.current.timeLeft) {
      window.cancelAnimationFrame(timer.current.requestId);
      timer.current = {};
      setTimeLeft(0);
    }
  }, []);

  const isOver = React.useCallback(() => {
    return over;
  }, [over]);

  const actions = React.useMemo(() => ({ start, pause, resume, reset, isOver }), []);

  React.useEffect(() => {
    return () => window.cancelAnimationFrame(timer.current.requestId);
  }, []);

  return [timeLeft, actions];
};

export default useCountDown;
