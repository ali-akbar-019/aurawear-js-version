import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const Layout = ({ children }) => {
    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-out",
            once: true,
            mirror: false,
        });
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
