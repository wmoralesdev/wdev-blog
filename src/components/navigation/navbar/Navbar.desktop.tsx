import React, {
    FC, PropsWithChildren,
} from 'react';
import NavbarContextProvider from '@ctx/navbar';

const NavbarDesktop: FC<PropsWithChildren> = ({ children }) => (
    <NavbarContextProvider>
        <nav className="sticky top-0 left-0 w-full py-4">
            { children }
        </nav>
    </NavbarContextProvider>
);

export const MenuDesktop: FC<PropsWithChildren> = ({ children }) => (
    <ul className="w-full flex justify-start items-center">
        { children }
    </ul>
);

export default NavbarDesktop;
