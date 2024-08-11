import { twMerge } from 'tailwind-merge';
import { FC, HTMLProps } from 'react';

type SectionProps = HTMLProps<HTMLDivElement> & {
  debug?: boolean;
  small?: boolean;
};

const Section: FC<SectionProps> = ({
  children,
  debug,
  small = false,
  ...props
}) => {
  const className = twMerge(
    props.className,
    small
      ? 'min-h-[var(--page-height)] lg:h-[var(--page-height)]'
      : 'h-[var(--page-height)]',
    'first:mt-[var(--nav-height)] py-8',
    debug && 'debug',
  );

  return (
    <section {...props} className={className}>
      {children}
    </section>
  );
};

export default Section;
