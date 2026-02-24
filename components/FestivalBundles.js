'use client';
import Link from 'next/link';
import styles from './FestivalBundles.module.css';

const bundles = [
    {
        id: 'diwali-edit',
        name: 'Diwali Edit Bundle',
        emoji: '🪔',
        festival: 'Diwali Special',
        description: '3 premium tees to light up your wardrobe',
        items: ['Midnight Raaga Oversized Tee', 'Bollywood Retro Tee', 'Desi Vibe Graphic Tee'],
        originalTotal: 3697,
        bundlePrice: 1799,
        savings: 1898,
        imageUrls: [
            'https://i.postimg.cc/PrbhVdHZ/Gemini-Generated-Image-6990rw6990rw6990.png',
            'https://i.postimg.cc/J0D0HvHt/Gemini-Generated-Image-cj29pycj29pycj29.png',
            'https://i.postimg.cc/fTzgZsXW/Gemini-Generated-Image-u9qvwpu9qvwpu9qv.png',
        ],
        gradient: 'linear-gradient(135deg, #FF6B35 0%, #D4A853 100%)',
        tag: 'BESTSELLER',
    },
    {
        id: 'durga-puja-pack',
        name: 'Durga Puja Pack',
        emoji: '🙏',
        festival: 'Durga Puja Special',
        description: 'Tee + Hoodie combo for pandal hopping',
        items: ['Temple Run Oversized Tee', 'Winter Beats Hoodie'],
        originalTotal: 4098,
        bundlePrice: 1999,
        savings: 2099,
        imageUrls: [
            'https://i.postimg.cc/qRGXZt18/Gemini-Generated-Image-f48rmmf48rmmf48r.png',
            'https://i.postimg.cc/Wzkp1Zxh/Gemini-Generated-Image-rpk6v9rpk6v9rpk6.png',
        ],
        gradient: 'linear-gradient(135deg, #3F37C9 0%, #FF4057 100%)',
        tag: 'SAVE ₹2099',
    },
    {
        id: 'holi-splash',
        name: 'Holi Splash Combo',
        emoji: '🎨',
        festival: 'Holi Special',
        description: '2 colorful tees to drench in fun',
        items: ['Neon Mumbai Crop Top', 'Rangoli Print Crop Tee'],
        originalTotal: 1898,
        bundlePrice: 899,
        savings: 999,
        imageUrls: [
            'https://i.postimg.cc/W1jZxpJ5/Gemini-Generated-Image-1mza3w1mza3w1mza.png',
            'https://i.postimg.cc/W1jZxpJ5/Gemini-Generated-Image-1mza3w1mza3w1mza.png',
        ],
        gradient: 'linear-gradient(135deg, #FF4057 0%, #FFD93D 50%, #10B981 100%)',
        tag: 'LIMITED',
    },
];

export default function FestivalBundles() {
    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">Festival Bundles 🎉</h2>
                <p className="section-subtitle">Curated combos at unbeatable prices — limited stock!</p>

                <div className={styles.grid}>
                    {bundles.map((bundle, i) => (
                        <div key={bundle.id} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                            {/* Header */}
                            <div className={styles.cardHeader} style={{ background: bundle.gradient }}>
                                <span className={styles.tag}>{bundle.tag}</span>
                                <div className={styles.imageStack}>
                                    {bundle.imageUrls.map((url, j) => (
                                        <div key={j} className={styles.stackItem} style={{ transform: `translateX(${j * 30}px) rotate(${j * -5}deg)`, zIndex: bundle.imageUrls.length - j }}>
                                            <img src={url} alt="" className={styles.stackImg} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Body */}
                            <div className={styles.cardBody}>
                                <span className={styles.festival}>{bundle.emoji} {bundle.festival}</span>
                                <h3 className={styles.name}>{bundle.name}</h3>
                                <p className={styles.desc}>{bundle.description}</p>

                                <ul className={styles.items}>
                                    {bundle.items.map((item, j) => (
                                        <li key={j}>✓ {item}</li>
                                    ))}
                                </ul>

                                <div className={styles.pricing}>
                                    <div className={styles.priceRow}>
                                        <span className={styles.bundlePrice}>₹{bundle.bundlePrice}</span>
                                        <span className={styles.originalPrice}>₹{bundle.originalTotal}</span>
                                    </div>
                                    <span className={styles.savingsBadge}>Save ₹{bundle.savings}!</span>
                                </div>

                                <Link href="/shop" className="btn btn-primary" style={{ width: '100%' }}>
                                    Shop Bundle →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
