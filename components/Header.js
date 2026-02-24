'use client';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import styles from './Header.module.css';

const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'od', label: 'ଓଡ଼ିଆ' },
];

const trustBadges = [
    { icon: '📦', text: 'COD Available' },
    { icon: '↩️', text: 'Free Returns' },
    { icon: '⚡', text: 'Fast Delivery' },
];

const searchSuggestions = [
    'Oversized T-shirts',
    'Hoodies',
    'Graphic Tees',
    'Festival Collection',
    'Under ₹999',
    'Women Dresses',
    'Printed T-shirts',
];

export default function Header() {
    const { cartCount, setIsCartOpen } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [activeLang, setActiveLang] = useState('en');
    const searchRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClick = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSearch(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const filteredSuggestions = searchSuggestions.filter(s =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Top Bar */}
            <div className={styles.topBar}>
                <div className={styles.topBarInner}>
                    <div className={styles.langToggle}>
                        {languages.map(lang => (
                            <button
                                key={lang.code}
                                className={`${styles.langBtn} ${activeLang === lang.code ? styles.langActive : ''}`}
                                onClick={() => setActiveLang(lang.code)}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                    <div className={styles.trustBadges}>
                        {trustBadges.map((badge, i) => (
                            <span key={i} className={styles.trustBadge}>
                                <span>{badge.icon}</span> {badge.text}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
                <div className={styles.headerInner}>
                    {/* Logo */}
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoText}>FUSIC</span>
                        <span className={styles.logoTagline}>Wear Your Story</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className={`${styles.nav} hide-mobile`}>
                        <Link href="/shop?category=men" className={styles.navLink}>Men</Link>
                        <Link href="/shop?category=women" className={styles.navLink}>Women</Link>
                        <Link href="/shop?category=oversized" className={styles.navLink}>Oversized</Link>
                        <Link href="/shop?category=hoodies" className={styles.navLink}>Hoodies</Link>
                        <Link href="/shop?category=under-999" className={styles.navLink}>
                            Under ₹999 <span className={styles.hotBadge}>HOT</span>
                        </Link>
                    </nav>

                    {/* Search + Actions */}
                    <div className={styles.actions}>
                        {/* Search */}
                        <div className={styles.searchWrap} ref={searchRef}>
                            <button
                                className={styles.searchToggle}
                                onClick={() => setShowSearch(!showSearch)}
                                aria-label="Search"
                            >
                                🔍
                            </button>
                            {showSearch && (
                                <div className={styles.searchDropdown}>
                                    <input
                                        type="text"
                                        placeholder="Search for tees, hoodies, dresses..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={styles.searchInput}
                                        autoFocus
                                    />
                                    {searchQuery && filteredSuggestions.length > 0 && (
                                        <div className={styles.suggestions}>
                                            {filteredSuggestions.map((s, i) => (
                                                <Link
                                                    key={i}
                                                    href={`/shop?q=${encodeURIComponent(s)}`}
                                                    className={styles.suggestion}
                                                    onClick={() => setShowSearch(false)}
                                                >
                                                    🔍 {s}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Wishlist */}
                        <Link href="/account?tab=wishlist" className={styles.iconBtn} aria-label="Wishlist">
                            ♡
                        </Link>

                        {/* Cart */}
                        <button
                            className={styles.cartBtn}
                            onClick={() => setIsCartOpen(true)}
                            aria-label="Cart"
                        >
                            🛒
                            {cartCount > 0 && (
                                <span className={styles.cartBadge}>{cartCount}</span>
                            )}
                        </button>

                        {/* Account */}
                        <Link href="/account" className={`${styles.iconBtn} hide-mobile`} aria-label="Account">
                            👤
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className={`${styles.hamburger} hide-desktop`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Menu"
                        >
                            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></span>
                            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></span>
                            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <nav className={styles.mobileNav}>
                        <Link href="/shop?category=men" onClick={() => setIsMobileMenuOpen(false)}>Men</Link>
                        <Link href="/shop?category=women" onClick={() => setIsMobileMenuOpen(false)}>Women</Link>
                        <Link href="/shop?category=oversized" onClick={() => setIsMobileMenuOpen(false)}>Oversized</Link>
                        <Link href="/shop?category=hoodies" onClick={() => setIsMobileMenuOpen(false)}>Hoodies</Link>
                        <Link href="/shop?category=dresses" onClick={() => setIsMobileMenuOpen(false)}>Dresses</Link>
                        <Link href="/shop?category=under-999" onClick={() => setIsMobileMenuOpen(false)}>Under ₹999 🔥</Link>
                        <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>My Account</Link>
                        <Link href="/account?tab=wishlist" onClick={() => setIsMobileMenuOpen(false)}>Wishlist ♡</Link>
                    </nav>
                </div>
            )}

            {/* Spacer for fixed header */}
            <div style={{ height: 'var(--header-total)' }}></div>
        </>
    );
}
