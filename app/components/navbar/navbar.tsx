'use client';

import { FC, useEffect, useState } from 'react';
import useWindowSize from 'app/hooks/useWindowSize';
import { User } from 'next-auth';
import NavbarMobile from './navbar-mobile';
import NavbarDesktop from './navbar-desktop';

type Weather = {
  tempC: number;
  icon: string;
};

type Props = {
  user?: User;
};

const Navbar: FC<Props> = ({ user }) => {
  const [weather, setWeather] = useState<Weather>();
  const { width } = useWindowSize();

  useEffect(() => {
    fetch(
      'https://api.weatherapi.com/v1/current.json?key=3546b39e40f74ebc8c472934241108&q=El Salvador&aqi=no',
    )
      .then((response) => response.json())
      .then((data) =>
        setWeather({
          tempC: data.current.temp_c,
          icon: data.current.condition.icon,
        }),
      );
  }, []);

  return width < 768 ? (
    <NavbarMobile weather={weather} user={user} />
  ) : (
    <NavbarDesktop weather={weather} user={user} />
  );
};

export default Navbar;
