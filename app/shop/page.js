'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import styles from './shop.module.css';

export default function ShopPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading catalogue...</div>}>
            <ShopContent />
        </Suspense>
    );
}

function ShopContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category') || 'all';
    const [sortBy, setSortBy] = useState('trending');

    const currentCategory = categories.find(c => c.id === categoryParam);

    // Filter products
    let filtered = [...products];
    if (categoryParam !== 'all') {
        if (categoryParam === 'under-999') {
            filtered = products.filter(p => p.price < 999);
        } else if (categoryParam === 'oversized') {
            filtered = products.filter(p => p.subcategory === 'oversized' || p.fit === 'Oversized');
        } else if (categoryParam === 'hoodies') {
            filtered = products.filter(p => p.subcategory === 'hoodies');
        } else {
            filtered = products.filter(p => p.category === categoryParam);
        }
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'newest': return b.newArrival ? 1 : -1;
            case 'rating': return b.rating - a.rating;
            case 'discount': return b.discount - a.discount;
            default: return b.trending ? 1 : -1;
        }
    });

    const allCategories = [
        { id: 'all', name: 'All Products', icon: '🛍️' },
        ...categories,
    ];

    return (
        <div className={styles.page}>
            {/* Category Hero */}
            {currentCategory && (
                <div className={styles.hero}>
                    <div className={styles.heroBg}>
                        <img src={currentCategory.imageUrl} alt={currentCategory.name} className={styles.heroImg} />
                        <div className={styles.heroOverlay} style={{ background: currentCategory.gradient }}></div>
                    </div>
                    <div className={`container ${styles.heroContent}`}>
                        <h1 className={styles.heroTitle}>{currentCategory.name}</h1>
                        <p className={styles.heroCount}>{filtered.length} Products</p>
                    </div>
                </div>
            )}

            {!currentCategory && (
                <div className={styles.heroSimple}>
                    <div className="container">
                        <h1 className={styles.heroTitle}>All Products</h1>
                        <p className={styles.heroSubtext}>Explore our full collection of Indian streetwear</p>
                    </div>
                </div>
            )}

            <div className="container">
                {/* Filter Bar */}
                <div className={styles.filterBar}>
                    <div className={styles.categoryPills}>
                        {allCategories.map(cat => (
                            <Link
                                key={cat.id}
                                href={cat.id === 'all' ? '/shop' : `/shop?category=${cat.id}`}
                                className={`${styles.pill} ${categoryParam === cat.id ? styles.pillActive : ''}`}
                            >
                                <span>{cat.icon}</span>
                                {cat.name}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.sortWrap}>
                        <label>Sort by:</label>
                        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className={styles.sortSelect}>
                            <option value="trending">Trending</option>
                            <option value="price-low">Price: Low → High</option>
                            <option value="price-high">Price: High → Low</option>
                            <option value="newest">Newest First</option>
                            <option value="rating">Best Rating</option>
                            <option value="discount">Biggest Discount</option>
                        </select>
                    </div>
                </div>

                {/* Results Info */}
                <div className={styles.resultsBar}>
                    <p>Showing <strong>{sorted.length}</strong> products {categoryParam !== 'all' ? `in ${currentCategory?.name || categoryParam}` : ''}</p>
                </div>

                {/* Product Grid */}
                {sorted.length > 0 ? (
                    <div className={styles.grid}>
                        {sorted.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <span>😅</span>
                        <h3>No products found in this category</h3>
                        <p>Try a different category or check back soon!</p>
                        <Link href="/shop" className="btn btn-primary">View All Products</Link>
                    </div>
                )}

                {/* Trust Strip */}
                <div className={styles.trustStrip}>
                    <div className={styles.trustItem}>
                        <span>💵</span>
                        <p>COD Available</p>
                    </div>
                    <div className={styles.trustItem}>
                        <span>🔄</span>
                        <p>7-Day Returns</p>
                    </div>
                    <div className={styles.trustItem}>
                        <span>🚚</span>
                        <p>Free Shipping ₹499+</p>
                    </div>
                    <div className={styles.trustItem}>
                        <span>✅</span>
                        <p>100% Genuine</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
