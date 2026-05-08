import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
    Menu,
    Search,
    Heart,
    ShoppingBag,
} from "lucide-react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion.jsx";

const MobileMenu = ({
    navigationLinks,
    cartCount,
    isLoggedIn,
    setSearchOpen,
    handleLogout,
    user
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
                <Menu className="w-6 h-6 md:hidden cursor-pointer text-gray-700 hover:text-blue-500 transition" />
            </SheetTrigger>

            <SheetContent side="left" className="w-64 p-1">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold mb-4">Menu</SheetTitle>
                    <SheetDescription className="flex flex-col gap-4">

                        {/* Navigation Links */}
                        <ul className="flex flex-col gap-4">
                            {navigationLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.href}
                                        to={link.href}
                                        className="flex items-center gap-2 hover:text-blue-500 transition font-medium"
                                        onClick={closeMenu}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </ul>

                        {/* Utilities: Search, Wishlist, Cart */}
                        <ul className="flex flex-col gap-4 pt-4 border-t border-gray-300 mt-4">
                            <li
                                onClick={() => {
                                    setSearchOpen(true);
                                    closeMenu();
                                }}
                                className="flex items-center gap-2 hover:text-blue-500 cursor-pointer font-medium"
                            >
                                <Search className="w-5 h-5" /> Search
                            </li>

                            <li>
                                <Link
                                    to="/whishlist"
                                    onClick={closeMenu}
                                    className="flex items-center gap-2 hover:text-pink-500 font-medium"
                                >
                                    <Heart className="w-5 h-5" /> Wishlist
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/cart"
                                    onClick={closeMenu}
                                    className="flex items-center gap-2 hover:text-green-500 font-medium relative"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                    Cart
                                </Link>
                            </li>
                        </ul>

                        {/* Auth Section */}
                        {!isLoggedIn ? (
                            <Link to="/login" onClick={closeMenu}>
                                <Button className="w-full mt-4 font-medium">Login</Button>
                            </Link>
                        ) : (
                            <Accordion
                                type="single"
                                collapsible
                                defaultValue="user"
                                className=""
                            >
                                <AccordionItem value="user">
                                    <AccordionTrigger className="font-semibold text-black">User</AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 mt-2">
                                        <Link
                                            to="/profile"
                                            className="hover:text-blue-500 font-medium"
                                            onClick={closeMenu}
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            to="/my-orders"
                                            className="hover:text-blue-500 font-medium"
                                            onClick={closeMenu}
                                        >
                                            My Orders
                                        </Link>
                                        {user && user?.role == "ADMIN" && <Link
                                            to="/admin/dashboard"
                                            className="hover:text-blue-500 font-medium"
                                            onClick={closeMenu}
                                        >
                                            Dashboard
                                        </Link>}
                                        <Button
                                            onClick={() => {
                                                handleLogout();
                                                closeMenu();
                                            }}
                                        >
                                            Logout
                                        </Button>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )}
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
