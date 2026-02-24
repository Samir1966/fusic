import styles from './Lookbook.module.css';

const looks = [
    {
        id: 1,
        title: 'Street Fusion',
        desc: 'Where ethnic meets urban',
        gradient: 'linear-gradient(135deg, #1a1a1a 0%, #FF6B35 100%)',
        products: ['Midnight Raaga Tee', 'Street Mantra Acid Wash'],
        emoji: '🎸',
        span: 'tall',
    },
    {
        id: 2,
        title: 'Festival Glow',
        desc: 'Colors that celebrate',
        gradient: 'linear-gradient(135deg, #FF6B35 0%, #FFD93D 50%, #FF4057 100%)',
        products: ['Festival Fire Hoodie', 'Rangoli Print Crop Tee'],
        emoji: '🪔',
        span: 'wide',
    },
    {
        id: 3,
        title: 'Campus Cool',
        desc: 'Your everyday flex',
        gradient: 'linear-gradient(135deg, #3F37C9 0%, #7B73F0 100%)',
        products: ['Chai & Chill Tee', 'Desi Vibe Graphic Tee'],
        emoji: '📚',
        span: 'normal',
    },
    {
        id: 4,
        title: 'Date Night',
        desc: 'Dress to impress',
        gradient: 'linear-gradient(135deg, #D4A853 0%, #1a1a1a 100%)',
        products: ['Bohemian Sunset Dress', 'Indigo Waves Maxi'],
        emoji: '✨',
        span: 'normal',
    },
];

export default function Lookbook() {
    return (
        <section className="section" style={{ background: 'var(--clr-primary)' }}>
            <div className="container">
                <h2 className="section-title" style={{ color: '#fff' }}>
                    Editorial Lookbook
                </h2>
                <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Curated looks for every mood
                </p>

                <div className={styles.grid}>
                    {looks.map((look, i) => (
                        <div
                            key={look.id}
                            className={`${styles.card} ${styles[look.span]}`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className={styles.cardBg} style={{ background: look.gradient }}></div>
                            <div className={styles.overlay}></div>
                            <div className={styles.content}>
                                <span className={styles.emoji}>{look.emoji}</span>
                                <h3 className={styles.title}>{look.title}</h3>
                                <p className={styles.desc}>{look.desc}</p>
                                <div className={styles.products}>
                                    {look.products.map((p, j) => (
                                        <span key={j} className={styles.productTag}>{p}</span>
                                    ))}
                                </div>
                                <button className={styles.shopBtn}>Shop Look →</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
