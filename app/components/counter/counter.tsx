'use client';

import {
  KeyframeOptions,
  useInView,
  useIsomorphicLayoutEffect,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { FC, HTMLAttributes, useEffect, useRef } from 'react';

type Props = {
  from: number;
  to: number;
  animationOptions?: KeyframeOptions;
  duration?: number;
} & HTMLAttributes<HTMLSpanElement>;

const Counter: FC<Props> = ({ from, to, duration, ...props }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    ...(duration
      ? { duration: duration * 1000 }
      : {
          damping: 100,
          stiffness: 100,
        }),
  });
  const inView = useInView(ref, { once: true, amount: 0.5, margin: '-200px' });

  useEffect(() => {
    if (ref.current) ref.current.textContent = from.toFixed(0);
  }, []);

  useEffect(() => {
    if (inView) {
      springValue.set(to);
    }
  }, [inView, springValue, to]);

  useIsomorphicLayoutEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat().format(
          +latest.toFixed(0),
        );
      }
    });
  }, [springValue]);

  return <span ref={ref} {...props} />;
};

export default Counter;
