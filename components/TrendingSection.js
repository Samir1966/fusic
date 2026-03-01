'use client';
import { useState, useEffect } from 'react';
import { trendingCities } from '@/data/products';
import { normalizeProduct } from '@/lib/normalize';
import ProductCard from './ProductCard';
import styles from './TrendingSection.module.css';

export default function TrendingSection() {
    const [city, setCity] = useState('Bhubaneswar');
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate city detection
        const randomCity = trendingCities[Math.floor(Math.random() * trendingCities.length)];
        setCity(randomCity);

        // Fetch trending products from real database
        fetch('/api/products?trending=true&limit=8')
            .then(r => r.json())
            .then(data => {
                const products = (data.products || []).map(normalizeProduct);
                setTrendingProducts(products);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <section className="section">
            <div className="container">
                <div className={styles.header}>
                    <div>
                        <h2 className="section-title">
                            What&apos;s Trending in <span className={styles.city}>{city}</span> 📍
                        </h2>
                        <p className="section-subtitle">Hottest picks in your city right now</p>
                    </div>
                    <div className={styles.citySelector}>
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className={styles.select}
                        >
                            {trendingCities.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="scroll-row">
                    {loading ? (
                        <div style={{ padding: '2rem', textAlign: 'center', width: '100%', color: '#888' }}>Loading trending products...</div>
                    ) : trendingProducts.length > 0 ? (
                        trendingProducts.map((product, i) => (
                            <div key={product.id} className={styles.cardWrap}>
                                <ProductCard product={product} index={i} />
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', width: '100%', color: '#888' }}>No trending products found.</div>
                    )}
                </div>
            </div>
        </section>
    );
}
