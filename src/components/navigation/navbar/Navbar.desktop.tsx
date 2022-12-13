import React, {
    FC, PropsWithChildren,
} from 'react';
import NavbarContextProvider from '@ctx/navbar';

const NavbarDesktop: FC<PropsWithChildren> = ({ children }) => (
    <NavbarContextProvider>
        <div className="mx-auto w-[50vw] sticky z-50 top-0 left-0">
            <nav className="w-full py-4 bg-neutral">
                { children }
            </nav>
        </div>
    </NavbarContextProvider>
);

export const MenuDesktop: FC<PropsWithChildren> = ({ children }) => (
    <ul className="w-full flex justify-start items-center">
        { children }
    </ul>
);

export default NavbarDesktop;
