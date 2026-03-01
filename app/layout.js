import './globals.css';
import StoreWrapper from '@/components/StoreWrapper';

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
        <StoreWrapper>{children}</StoreWrapper>
      </body>
    </html>
  );
}
