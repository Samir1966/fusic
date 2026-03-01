'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './admin.module.css';

const navItems = [
    { href: '/admin', icon: '📊', label: 'Dashboard' },
    { href: '/admin/products', icon: '👕', label: 'Products' },
    { href: '/admin/orders', icon: '📦', label: 'Orders' },
    { href: '/admin/customers', icon: '👥', label: 'Customers' },
    { href: '/admin/coupons', icon: '🏷️', label: 'Coupons' },
];

export default function AdminLayout({ children }) {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Skip auth check on login page
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (isLoginPage) {
            setLoading(false);
            return;
        }

        fetch('/api/auth/admin')
            .then((res) => res.json())
            .then((data) => {
                if (!data.authenticated) {
                    router.push('/admin/login');
                } else {
                    setAdmin(data.admin);
                }
                setLoading(false);
            })
            .catch(() => {
                router.push('/admin/login');
                setLoading(false);
            });
    }, [isLoginPage, router]);

    const handleLogout = async () => {
        await fetch('/api/auth/admin', { method: 'DELETE' });
        router.push('/admin/login');
    };

    if (isLoginPage) return children;
    if (loading) {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.spinner}></div>
                <p>Loading admin panel...</p>
            </div>
        );
    }
    if (!admin) return null;

    return (
        <div className={styles.adminLayout}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? '' : styles.sidebarCollapsed}`}>
                <div className={styles.sidebarHeader}>
                    <Link href="/admin" className={styles.sidebarLogo}>
                        <span className={styles.logoText}>FUSIC</span>
                        {sidebarOpen && <span className={styles.logoSub}>Admin</span>}
                    </Link>
                    <button
                        className={styles.toggleBtn}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? '←' : '→'}
                    </button>
                </div>

                <nav className={styles.sidebarNav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${pathname === item.href ? styles.navActive : ''}`}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            {sidebarOpen && <span className={styles.navLabel}>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <div className={styles.adminInfo}>
                        <span className={styles.adminAvatar}>😎</span>
                        {sidebarOpen && (
                            <div>
                                <p className={styles.adminName}>{admin.name}</p>
                                <p className={styles.adminRole}>{admin.role}</p>
                            </div>
                        )}
                    </div>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        {sidebarOpen ? '🚪 Logout' : '🚪'}
                    </button>
                    <Link href="/" className={styles.viewSiteBtn}>
                        {sidebarOpen ? '🌐 View Site' : '🌐'}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
