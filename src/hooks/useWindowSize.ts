import { useEffect, useState } from 'react';

interface Dimensions {
    width: number;
    height: number;
}

const useWindowSize = () => {
    const [dimensions, setDimensions] = useState<Dimensions>(
        { width: 0, height: 0 },
    );

    const handleResize = () => {
        if (typeof window !== 'undefined') setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return dimensions;
};

export default useWindowSize;
