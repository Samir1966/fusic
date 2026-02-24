'use client';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import styles from './Recommendations.module.css';

export default function Recommendations() {
    // Simulate personalized recommendations (random order)
    const recommended = [...products].sort(() => Math.random() - 0.5).slice(0, 6);

    return (
        <section className="section">
            <div className="container">
                <div className={styles.header}>
                    <div>
                        <h2 className="section-title">Recommended For You ✨</h2>
                        <p className="section-subtitle">Based on your style preferences</p>
                    </div>
                </div>

                <div className={styles.grid}>
                    {recommended.map((product, i) => (
                        <ProductCard key={product.id} product={product} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
