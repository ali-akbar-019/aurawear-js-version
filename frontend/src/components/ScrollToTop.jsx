import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scrolls to the top of the page on route change
        window.scrollTo(0, 0);
    }, [pathname]); // Reruns the effect when the pathname changes

    return null; // This component doesn't render anything to the DOM
}

export default ScrollToTop;
