import { useState, useEffect, useCallback, useMemo } from 'react';

const useClock = (initialDate: Date) => {
  const [time, setTime] = useState(() => initialDate);

  const updateTime = useCallback(() => {
    setTime(new Date());
  }, []);

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  const formattedTime = useMemo(() => {
    let ft = time
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      })
      .toLowerCase();

    ft = ft.replace('am', 'a.m.').replace('pm', 'p.m.');

    return ft;
  }, [time]);

  return formattedTime;
};

export default useClock;
