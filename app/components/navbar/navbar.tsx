'use client';

import { FC } from 'react';
import useWindowSize from '@/app/hooks/useWindowSize';
import NavbarMobile from './navbar-mobile';
import NavbarDesktop from './navbar-desktop';

const Navbar: FC = () => {
  const { width } = useWindowSize();

  return width < 768 ? <NavbarMobile /> : <NavbarDesktop />;
};

export default Navbar;
