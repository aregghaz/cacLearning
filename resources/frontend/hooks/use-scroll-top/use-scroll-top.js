import { useEffect } from 'react';
import { useLocation } from '@reach/router';

export default function useScrollTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
