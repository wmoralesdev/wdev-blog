/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import classNames from 'classnames';
import { FC } from 'react';

type MarqueeProps = {
  items: {
    label: string;
    Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  }[];
  direction?: 'forwards' | 'backwards';
  speed?: number;
  className?: string;
};

const Marquee: FC<MarqueeProps> = ({
  items,
  direction = 'forwards',
  speed = 20,
  className,
}) => {
  const mainSlide = items.map(({ label, Icon }, index) => (
    <div key={index} className="marquee-item">
      <Icon className="marquee-icon" />
      <span>{label}</span>
    </div>
  ));

  const secondarySlide = items.map(({ label, Icon }, index) => (
    <div key={index} className="marquee-item" aria-hidden="true">
      <Icon className="marquee-icon" />
      <span>{label}</span>
    </div>
  ));

  return (
    <div className={classNames('marquee fadeout-horizontal', className)}>
      <div
        className={classNames(
          'marquee-slide',
          direction === 'backwards' && '[--direction:reverse]',
        )}
        style={{ '--speed': `${speed}s` } as React.CSSProperties}
      >
        {mainSlide}
      </div>
      <div
        className={classNames(
          'marquee-slide',
          direction === 'backwards' && '[--direction:reverse]',
        )}
        style={{ '--speed': `${speed}s` } as React.CSSProperties}
      >
        {secondarySlide}
      </div>
    </div>
  );
};

export default Marquee;
