'use client';
import { usePathname } from 'next/navigation';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export default function StoreWrapper({ children }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) return children;

    return (
        <LanguageProvider>
            <CartProvider>
                <Header />
                <main>{children}</main>
                <Footer />
                <CartDrawer />
                <a
                    href="https://whatsapp.com/channel/0029Vb7SPnTL7UVcbJccAL1M"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-float"
                    aria-label="Chat on WhatsApp"
                >
                    💬
                </a>
            </CartProvider>
        </LanguageProvider>
    );
}
