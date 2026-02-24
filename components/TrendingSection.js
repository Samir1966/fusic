'use client';
import { useState, useEffect } from 'react';
import { products, trendingCities } from '@/data/products';
import ProductCard from './ProductCard';
import styles from './TrendingSection.module.css';

export default function TrendingSection() {
    const [city, setCity] = useState('Bhubaneswar');
    const trendingProducts = products.filter(p => p.trending);

    useEffect(() => {
        // Simulate city detection
        const randomCity = trendingCities[Math.floor(Math.random() * trendingCities.length)];
        setCity(randomCity);
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
                    {trendingProducts.map((product, i) => (
                        <div key={product.id} className={styles.cardWrap}>
                            <ProductCard product={product} index={i} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
