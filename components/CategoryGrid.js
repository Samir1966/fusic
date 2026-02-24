import Link from 'next/link';
import { categories } from '@/data/products';
import styles from './CategoryGrid.module.css';

export default function CategoryGrid() {
    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">Shop By Category</h2>
                <p className="section-subtitle">Find your perfect style</p>

                <div className={styles.grid}>
                    {categories.map((cat, i) => (
                        <Link
                            key={cat.id}
                            href={`/shop?category=${cat.id}`}
                            className={styles.card}
                            style={{ animationDelay: `${i * 0.08}s` }}
                        >
                            <div className={styles.cardBg}>
                                <img src={cat.imageUrl} alt={cat.name} className={styles.cardImg} loading="lazy" />
                                <div className={styles.cardOverlay} style={{ background: cat.gradient }}></div>
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.icon}>{cat.icon}</span>
                                <h3 className={styles.name}>{cat.name}</h3>
                                <p className={styles.count}>{cat.count} Products</p>
                                <span className={styles.arrow}>→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
