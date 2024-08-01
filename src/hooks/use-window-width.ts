import { useState, useEffect } from 'react';

export const useWindowWidth = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const isMobile = width <= 560;

    useEffect(() => {
        const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    return { width, isMobile };
};
