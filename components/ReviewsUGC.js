import { reviews } from '@/data/products';
import styles from './ReviewsUGC.module.css';

export default function ReviewsUGC() {
    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">Real People. Real Stories. 💬</h2>
                <p className="section-subtitle">50,000+ happy customers across India</p>

                <div className={styles.grid}>
                    {reviews.map((review, i) => (
                        <div key={review.id} className={styles.card} style={{ animationDelay: `${i * 0.08}s` }}>
                            <div className={styles.cardTop}>
                                <div className={styles.avatar}>
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <p className={styles.name}>
                                        {review.name}
                                        {review.verified && <span className={styles.verified}>✓ Verified</span>}
                                    </p>
                                    <p className={styles.city}>📍 {review.city}</p>
                                </div>
                            </div>

                            <div className="stars" style={{ marginBottom: '8px' }}>
                                {[...Array(5)].map((_, j) => (
                                    <span key={j}>{j < review.rating ? '★' : '☆'}</span>
                                ))}
                            </div>

                            <p className={styles.text}>{review.text}</p>

                            <div className={styles.product}>
                                <span>👕</span> {review.product}
                            </div>

                            <p className={styles.date}>{review.date}</p>
                        </div>
                    ))}
                </div>

                {/* Instagram Gallery Mock */}
                <div className={styles.instagramSection}>
                    <h3 className={styles.instaTitle}>📸 #FUSICFam on Instagram</h3>
                    <div className={styles.instaGrid}>
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className={styles.instaCard}>
                                <div className={styles.instaImage} style={{
                                    background: [
                                        'linear-gradient(135deg, #FF6B35, #FF4057)',
                                        'linear-gradient(135deg, #3F37C9, #7B73F0)',
                                        'linear-gradient(135deg, #1a1a1a, #3F37C9)',
                                        'linear-gradient(135deg, #D4A853, #FF6B35)',
                                        'linear-gradient(135deg, #FF4057, #D4A853)',
                                        'linear-gradient(135deg, #10B981, #3F37C9)',
                                    ][i - 1]
                                }}>
                                    <span className={styles.instaEmoji}>
                                        {['👕', '👗', '🧤', '📸', '🎨', '🔥'][i - 1]}
                                    </span>
                                </div>
                                <div className={styles.instaOverlay}>
                                    <span>❤️ {Math.floor(Math.random() * 500 + 100)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
