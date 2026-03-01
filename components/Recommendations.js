'use client';
import { useState, useEffect } from 'react';
import { normalizeProduct } from '@/lib/normalize';
import ProductCard from './ProductCard';
import styles from './Recommendations.module.css';

export default function Recommendations() {
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch random/recently added products as recommendations
        fetch('/api/products?limit=6')
            .then(r => r.json())
            .then(data => {
                let products = (data.products || []).map(normalizeProduct);
                // Simulate personalized recommendations by randomizing
                products = products.sort(() => Math.random() - 0.5).slice(0, 6);
                setRecommended(products);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <section className="section">
            <div className="container">
                <div className={styles.header}>
                    <div>
                        <h2 className="section-title">Recommended For You ✨</h2>
                        <p className="section-subtitle">Based on your style preferences</p>
                    </div>
                </div>

                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: '#888' }}>Loading recommendations...</div>
                ) : recommended.length > 0 ? (
                    <div className={styles.grid}>
                        {recommended.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                ) : (
                    <div style={{ padding: '3rem', textAlign: 'center', color: '#888' }}>No recommendations found.</div>
                )}
            </div>
        </section>
    );
}
