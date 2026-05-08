import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        setEmail('');
    };

    const footerSections = [
        {
            title: 'Shop',
            links: [
                { label: 'New Arrivals', href: '/shop/new' },
                { label: 'Best Sellers', href: '/shop/bestsellers' },
                { label: 'Sale', href: '/shop/sale' },
                { label: 'Collections', href: '/collections' },
            ],
        },
        {
            title: 'Company',
            links: [
                { label: 'About Us', href: '/about' },
                { label: 'Careers', href: '/careers' },
                { label: 'Blog', href: '/blog' },
                { label: 'Press', href: '/press' },
            ],
        },
        {
            title: 'Support',
            links: [
                { label: 'Contact Us', href: '/contact' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Shipping Info', href: '/shipping' },
                { label: 'Returns', href: '/returns' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Cookie Policy', href: '/cookies' },
                { label: 'Accessibility', href: '/accessibility' },
            ],
        },
    ];

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    ];

    return (
        <footer className="bg-pink-700 text-primary-foreground">
            {/* Newsletter Section */}
            <div className="border-b border-primary-foreground/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-background">
                                Join Our Community
                            </h3>
                            <p className="text-background/70 text-sm md:text-base">
                                Subscribe to get special offers, AI styling tips, and early access to new collections.
                            </p>
                        </div>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-background/40"
                            />
                            <Button
                                type="submit"
                                className="bg-background text-primary hover:bg-background/90 font-medium whitespace-nowrap"
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6 mb-12">
                    {/* Brand Info */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-primary font-bold">AI</span>
                            </div>
                            <span className="font-bold text-lg text-background">AuraWear</span>
                        </Link>
                        <p className="text-background/70 text-sm mb-6">
                            AI-powered fashion recommendations tailored to your unique style.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-sm text-background/70">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>123 Fashion Avenue, Style City, SC 12345</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-background/70">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <a href="tel:+1234567890" className="hover:text-background transition-colors">
                                    +1 (234) 567-890
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-background/70">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <a href="mailto:support@auraware.com" className="hover:text-background transition-colors">
                                    support@auraware.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer Links */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h4 className="font-semibold text-background mb-4 text-sm uppercase tracking-wide">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            to={link.href}
                                            className="text-background/70 hover:text-background text-sm transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-background/20 pt-8 md:pt-12">
                    {/* Social Links */}
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-sm font-medium text-background/70">Follow Us</span>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background/70 hover:bg-background/20 hover:text-background transition-all duration-200 hover:scale-110"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/60">
                        <p>
                            &copy; {new Date().getFullYear()} AuraWear AI. All rights reserved. Designed with care.
                        </p>
                        <div className="flex gap-6">
                            <Link to="/privacy" className="hover:text-background/80 transition-colors">
                                Privacy
                            </Link>
                            <Link to="/terms" className="hover:text-background/80 transition-colors">
                                Terms
                            </Link>
                            <Link to="/cookies" className="hover:text-background/80 transition-colors">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
