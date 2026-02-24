import styles from './USPStrip.module.css';

const usps = [
    { icon: '💳', title: 'COD + UPI', desc: 'Pay your way' },
    { icon: '↩️', title: '7 Day Easy Returns', desc: 'No questions asked' },
    { icon: '🏷️', title: 'Affordable Fashion', desc: 'Premium at low prices' },
    { icon: '📏', title: 'Size Assist', desc: 'AI-powered fit guide' },
];

export default function USPStrip() {
    return (
        <section className={styles.strip}>
            <div className="container">
                <div className={styles.grid}>
                    {usps.map((usp, i) => (
                        <div key={i} className={styles.item}>
                            <span className={styles.icon}>{usp.icon}</span>
                            <div>
                                <p className={styles.title}>{usp.title}</p>
                                <p className={styles.desc}>{usp.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
