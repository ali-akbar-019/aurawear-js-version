import { Button } from '@/components/ui/button.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useCart } from '@/contexts/CartContext.jsx';
import { Cpu, Heart, Home, Info, Layers, Mail, Search, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { IconButton } from '../IconButton.jsx';
import { Dialog, DialogContent } from '../ui/dialog.jsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu.jsx';
import { Input } from '../ui/input.jsx';
import MobileMenu from './MobileMenu.jsx';

const Header = () => {
    const { cart } = useCart();
    const { isLoggedIn, logout, user } = useAuth();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const cartCount = cart?.items?.length || 0;

    const navigationLinks = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/shop', label: 'Shop', icon: ShoppingCart },
        { href: '/categories', label: 'Categories', icon: Layers },
        { href: '/ai-fit', label: 'AI Fit', icon: Cpu },
        { href: '/about', label: 'About', icon: Info },
        { href: '/contact', label: 'Contact', icon: Mail },
    ];

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            toast.error('Something went wrong while logging out.');
            console.error(error);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <img src="/logo.png" alt="Logo" className="max-w-[150px]" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Search */}
                        <IconButton onClick={() => setSearchOpen(true)} className="hidden md:block text-foreground/70 hover:text-primary">
                            <Search className="w-5 h-5" />
                        </IconButton>

                        {/* Wishlist */}
                        <Link to="/whishlist" className="hidden md:block">
                            <IconButton className="relative text-foreground/70 hover:text-primary">
                                <Heart className="w-5 h-5" />
                            </IconButton>
                        </Link>

                        {/* Cart */}
                        <Link to="/cart" className="hidden md:block">
                            <IconButton className="relative text-foreground/70 hover:text-primary">
                                <ShoppingBag className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-background text-[10px] font-bold flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </IconButton>
                        </Link>

                        {/* User Dropdown */}
                        {isLoggedIn ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="relative p-2 rounded-full text-muted-foreground transition-all hover:text-primary hover:bg-muted hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring hidden md:block">
                                        <User className="w-5 h-5" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuItem asChild>
                                            <Link to="/profile">Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/my-orders">My Orders</Link>
                                        </DropdownMenuItem>
                                        {user && user?.role == "ADMIN" && <DropdownMenuItem asChild>
                                            <Link to="/admin/dashboard">Dashboard</Link>
                                        </DropdownMenuItem>}
                                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link to="/login">
                                <Button size="sm" className="hidden md:inline-flex px-4 bg-primary text-background hover:bg-primary/90">
                                    Login
                                </Button>
                            </Link>
                        )}

                        {/* Mobile Menu */}
                        <MobileMenu
                            navigationLinks={navigationLinks}
                            cartCount={cartCount}
                            isLoggedIn={isLoggedIn}
                            setSearchOpen={setSearchOpen}
                            handleLogout={handleLogout}
                            user={user ? user : null}
                        />
                    </div>
                </div>
            </div>

            {/* Search Dialog */}
            <Dialog
                open={searchOpen}
                onOpenChange={(open) => {
                    setSearchOpen(open);
                    if (!open) setSearchQuery('');
                }}
            >
                <DialogContent className="max-w-full sm:max-w-xl border-none bg-background/70 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-3">
                        <Search className="w-5 h-5 text-muted-foreground" />
                        <Input
                            autoFocus
                            placeholder="Search products…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchQuery.trim()) {
                                    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
                                    setSearchOpen(false);
                                }
                            }}
                            className="border-0 bg-transparent p-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </header>
    );
};

export default Header;
