import React, {
    createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useMemo, useState,
} from 'react';

type NavbarContextType = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

const NavbarContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const ctxValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);

    return (
        <NavbarContext.Provider value={ctxValue}>
            { children }
        </NavbarContext.Provider>
    );
};

export default NavbarContextProvider;
