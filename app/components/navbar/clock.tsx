/* eslint-disable react/jsx-props-no-spreading */

import useClock from 'app/hooks/useClock';
import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';

export const Clock: FC<HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => {
  const time = useClock(new Date());
  return (
    <span
      suppressHydrationWarning
      {...props}
      className={classNames('font-mono font-bold', className)}
    >
      {time}
    </span>
  );
};
