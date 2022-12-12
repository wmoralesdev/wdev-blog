import React, {
    FC, PropsWithChildren, useContext,
} from 'react';
import classNames from 'classnames';
import NavbarContextProvider, { NavbarContext } from '@ctx/navbar';

const NavigationButton: FC = () => {
    const { isOpen, setIsOpen } = useContext(NavbarContext)!;

    return (
        <button type="button" className="relative z-50" onClick={() => setIsOpen(!isOpen)}>
            <div className={classNames('cust-transition', isOpen ? 'opacity-0' : 'opacity-100', 'bg-white h-1 w-8 rounded-xl mb-2')} />
            <div className={classNames(
                'transition-all duration-700',
                isOpen && 'transform-gpu rotate-180',
                'bg-white h-1 w-8 rounded-xl my-2',
            )}
            />
            <div className={classNames('cust-transition', isOpen ? 'opacity-0' : 'opacity-100', 'bg-white h-1 w-8 rounded-xl my-2')} />
        </button>
    );
};

const NavbarMobile: FC<PropsWithChildren> = ({ children }) => (
    <NavbarContextProvider>
        <nav className="relative top-0 left-0 w-full py-4 overflow-hidden">
            <div className="w-full flex items-center justify-start">
                <NavigationButton />
            </div>
            { children }
        </nav>
    </NavbarContextProvider>
);

export const MenuMobile: FC<PropsWithChildren> = ({ children }) => {
    const { isOpen } = useContext(NavbarContext)!;

    return (
        <ul className={classNames('fixed z-[9999] top-0 left-0 bg-neutral flex flex-col mt-10 px-4 cust-transition overflow-hidden', isOpen ? 'w-full h-screen' : 'w-0 h-0')}>
            { children }
        </ul>
    );
};

export default NavbarMobile;
