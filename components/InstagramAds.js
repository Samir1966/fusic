'use client';
import Link from 'next/link';
import styles from './InstagramAds.module.css';

const instaAds = [
    {
        id: 1,
        type: 'dark',
        headline: 'Streetwear with a Desi Soul',
        imageUrl: 'https://i.postimg.cc/PrbhVdHZ/Gemini-Generated-Image-6990rw6990rw6990.png',
        tagline: 'Discover fusion apparel that blends Indian rhythm with modern street culture.',
        link: '/shop',
    },
    {
        id: 2,
        type: 'light',
        headline: 'ADD THE CULTURAL PULSE',
        imageUrl: 'https://i.postimg.cc/Wzkp1Zxh/Gemini-Generated-Image-rpk6v9rpk6v9rpk6.png',
        tagline: 'Modern silhouettes meet deep ethnic roots. Built to withstand the vibrant chaos.',
        link: '/shop?category=oversized',
    },
    {
        id: 3,
        type: 'split',
        headline: 'START WITH THE STREET SOUL',
        imageUrl: 'https://i.postimg.cc/9FsTbtcS/Gemini-Generated-Image-p8h5pxp8h5pxp8h5.png',
        tagline: 'Premium, breathable cotton that handles the hustle. Your everyday urban armor.',
        link: '/shop',
    },
    {
        id: 4,
        type: 'lifestyle',
        headline: 'WEAR THE FESTIVAL OF COLORS',
        bgImage: '/images/hero-festival-edit.png',
        tagline: "From the daily city grind to India's loudest celebration. Are you ready for the shift?",
        link: '/shop?category=festival',
    },
    {
        id: 5,
        type: 'product',
        headline: 'Chai & Chill Collection',
        subhead: 'Transitional Comfort',
        imageUrl: 'https://i.postimg.cc/9FsTbtcS/Gemini-Generated-Image-p8h5pxp8h5pxp8h5.png',
        price: '₹999',
        priceLabel: 'Premium Cotton',
        link: '/product/chai-chill-oversized',
    },
];

function AdCard({ ad }) {
    if (ad.type === 'dark') {
        return (
            <Link href={ad.link} className={`${styles.adCard} ${styles.adDark}`}>
                <h3 className={styles.adHeadline}>{ad.headline}</h3>
                <div className={styles.adImageWrap}>
                    <img src={ad.imageUrl} alt={ad.headline} className={styles.adImage} />
                </div>
                <p className={styles.adTagline}>{ad.tagline}</p>
                <span className={styles.igHandle}>@fusic.store</span>
            </Link>
        );
    }

    if (ad.type === 'light') {
        return (
            <Link href={ad.link} className={`${styles.adCard} ${styles.adLight}`}>
                <h3 className={`${styles.adHeadline} ${styles.headlineDark}`}>{ad.headline}</h3>
                <div className={styles.adDivider}></div>
                <div className={styles.adImageWrap}>
                    <img src={ad.imageUrl} alt={ad.headline} className={styles.adImage} />
                </div>
                <p className={`${styles.adTagline} ${styles.taglineDark}`}>{ad.tagline}</p>
                <span className={`${styles.igHandle} ${styles.handleDark}`}>@fusic.store</span>
            </Link>
        );
    }

    if (ad.type === 'split') {
        return (
            <Link href={ad.link} className={`${styles.adCard} ${styles.adSplit}`}>
                <div className={styles.splitTop}>
                    <img src={ad.imageUrl} alt={ad.headline} className={styles.adImage} />
                </div>
                <div className={styles.splitBottom}>
                    <h3 className={styles.adHeadline}>{ad.headline}</h3>
                    <p className={styles.adTagline}>{ad.tagline}</p>
                    <div className={styles.splitLine}></div>
                </div>
                <span className={styles.igHandle}>@fusic.store</span>
            </Link>
        );
    }

    if (ad.type === 'lifestyle') {
        return (
            <Link href={ad.link} className={`${styles.adCard} ${styles.adLifestyle}`}>
                <img src={ad.bgImage} alt={ad.headline} className={styles.lifestyleBg} />
                <div className={styles.lifestyleOverlay}></div>
                <div className={styles.lifestyleContent}>
                    <h3 className={styles.adHeadline}>{ad.headline}</h3>
                    <p className={styles.adTagline}>{ad.tagline}</p>
                </div>
                <span className={styles.igHandle}>@fusic.store</span>
            </Link>
        );
    }

    if (ad.type === 'product') {
        return (
            <Link href={ad.link} className={`${styles.adCard} ${styles.adProduct}`}>
                <div className={styles.productImageWrap}>
                    <img src={ad.imageUrl} alt={ad.headline} className={styles.adImage} />
                </div>
                <div className={styles.productInfo}>
                    <div className={styles.productBadge}>
                        <span className={styles.productTitle}>{ad.headline}</span>
                        <span className={styles.productSub}>{ad.subhead}</span>
                    </div>
                    <div className={styles.productBadge}>
                        <span className={styles.productSub}>{ad.priceLabel}</span>
                        <span className={styles.productPrice}>{ad.price}</span>
                    </div>
                </div>
                <div className={styles.shopNowBtn}>SHOP NOW</div>
                <span className={`${styles.igHandle} ${styles.handleDark}`}>@fusic.store</span>
            </Link>
        );
    }

    return null;
}

export default function InstagramAds() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <div className={styles.igIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <circle cx="12" cy="12" r="5" />
                            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                        </svg>
                    </div>
                    <h2 className={styles.title}>Follow Us on Instagram</h2>
                    <p className={styles.subtitle}>
                        Your daily dose of desi streetwear inspo ✨ Tag <strong>@fusic.store</strong> to get featured
                    </p>
                </div>
                <div className={styles.grid}>
                    {instaAds.map((ad) => (
                        <AdCard key={ad.id} ad={ad} />
                    ))}
                </div>
                <div className={styles.followCta}>
                    <a
                        href="https://instagram.com/fusic.store"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.followBtn}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <circle cx="12" cy="12" r="5" />
                            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                        </svg>
                        Follow @fusic.store
                    </a>
                </div>
            </div>
        </section>
    );
}
