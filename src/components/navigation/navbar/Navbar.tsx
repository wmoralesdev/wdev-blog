'use client';

import React, {
    FC, PropsWithChildren,
} from 'react';
import Link from 'next/link';
import useWindowSize from '@hooks/useWindowSize';
import NavbarContextProvider from '@ctx/navbar';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import NavbarDesktop, { MenuDesktop } from './Navbar.desktop';
import NavbarMobile, { MenuMobile } from './Navbar.mobile';

export interface NavbarSubComponents {
    Menu: FC<PropsWithChildren>;
    Item: FC<NavbarItemProps>;
}

export interface NavbarItemProps extends PropsWithChildren {
    to: string;
}

const Navbar: FC<PropsWithChildren> & NavbarSubComponents = ({ children }) => {
    const { width } = useWindowSize();

    return (
        width >= 768 ? (
            <NavbarDesktop>
                {children}
            </NavbarDesktop>
        ) : (
            <NavbarContextProvider>
                <NavbarMobile>
                    { children }
                </NavbarMobile>
            </NavbarContextProvider>
        )
    );
};

const Menu: FC<PropsWithChildren> = ({ children }) => {
    const { width } = useWindowSize();

    return (
        width >= 768 ? (
            <MenuDesktop>
                { children }
            </MenuDesktop>
        ) : (
            <MenuMobile>
                { children }
            </MenuMobile>
        )
    );
};

const Item: FC<NavbarItemProps> = ({ to, children }) => {
    const { asPath } = useRouter();

    return (
        <li className="flex justify-start items-center text-xl font-normal border-t border-y-slate-500 last-of-type:border-b cust-transition first-of-type:mt-10
        md:border-none md:rounded-lg md:hover:bg-primary md:first-of-type:mt-0 md:first-of-type:-ml-4"
        >
            <Link href={to} className={classNames('w-full h-full py-5', to === asPath && 'underline decoration-primary decoration-4', 'md:py-3 md:px-4')}>{children}</Link>
        </li>
    );
};

Navbar.Menu = Menu;
Navbar.Item = Item;

export default Navbar;
