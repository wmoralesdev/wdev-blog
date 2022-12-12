import { Navbar } from '@components/navigation';
import React, { FC, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

const variants = {
    hidden: { opacity: 0, x: -50, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
};

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <div className="mx-auto flex flex-col justify-start items-center px-4
    md:max-w-screen-md"
    >
        <Toaster toastOptions={{ style: { color: 'white', backgroundColor: '#333', borderRadius: '10px' } }} />
        <Navbar>
            <Navbar.Menu>
                <Navbar.Item to="/">Home</Navbar.Item>
                <Navbar.Item to="/guestbook">Guestbook</Navbar.Item>
                <Navbar.Item to="/about">About</Navbar.Item>
                <Navbar.Item to="/blog">Blog</Navbar.Item>
            </Navbar.Menu>
        </Navbar>
        <motion.main
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ type: 'linear' }}
        >
            <div className="mt-4 md:mt-8">
                { children }
            </div>
        </motion.main>
    </div>
);

export default Layout;
