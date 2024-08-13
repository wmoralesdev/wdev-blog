import { useState, useEffect } from 'react';

export default function useWindowSize() {
  const safeWindow = typeof window !== 'undefined' ? window : null;

  const [windowSize, setWindowSize] = useState({
    width: safeWindow?.innerWidth ?? 0,
    height: safeWindow?.innerHeight ?? 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: safeWindow?.innerWidth ?? 0,
        height: safeWindow?.innerHeight ?? 0,
      });
    };

    safeWindow?.addEventListener('resize', handleResize);

    return () => {
      safeWindow?.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}
