import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata = {
  title: 'FUSIC — Wear Your Story | Indian Streetwear & Fashion',
  description: 'Bold, youthful, street-ethnic fusion fashion for India. Premium printed t-shirts, hoodies, dresses at affordable prices. COD available. Free returns.',
  keywords: 'FUSIC, Indian fashion, streetwear, printed t-shirts, hoodies, dresses, affordable fashion, COD, online shopping India',
  openGraph: {
    title: 'FUSIC — Wear Your Story',
    description: 'Bold, youthful, street-ethnic fusion fashion for India.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1a1a1a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          {/* WhatsApp Float */}
          <a
            href="https://wa.me/919876543210?text=Hi%20FUSIC!%20I%20want%20to%20shop"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="Chat on WhatsApp"
          >
            💬
          </a>
        </CartProvider>
      </body>
    </html>
  );
}
