'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, index = 0 }) {
    const { addToCart } = useCart();

    const handleQuickAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, product.sizes[1] || product.sizes[0], product.colorNames[0]);
    };

    return (
        <Link
            href={`/product/${product.slug}`}
            className={styles.card}
            style={{ animationDelay: `${index * 0.05}s` }}
        >
            {/* Image */}
            <div className={styles.imageWrap}>
                <div className={styles.image}>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className={styles.productImg}
                        loading="lazy"
                    />
                </div>

                {/* Badges */}
                <div className={styles.badges}>
                    {product.newArrival && <span className={styles.badgeNew}>NEW</span>}
                    {product.discount > 0 && (
                        <span className={styles.badgeDiscount}>-{product.discount}%</span>
                    )}
                </div>

                {/* Quick Add */}
                <button className={styles.quickAdd} onClick={handleQuickAdd}>
                    + Add to Cart
                </button>

                {/* Wishlist */}
                <button
                    className={styles.wishlist}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                >
                    ♡
                </button>
            </div>

            {/* Info */}
            <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.meta}>{product.fabric} • {product.fit}</p>

                {/* Colors */}
                <div className={styles.colors}>
                    {product.colors.map((color, i) => (
                        <span
                            key={i}
                            className={styles.colorDot}
                            style={{ background: color, border: color === '#FFFFFF' || color === '#FAF7F2' ? '1px solid #ddd' : 'none' }}
                            title={product.colorNames[i]}
                        />
                    ))}
                </div>

                {/* Price */}
                <div className="price">
                    <span className="price-current">₹{product.price}</span>
                    <span className="price-original">₹{product.originalPrice}</span>
                    <span className="price-discount">{product.discount}% OFF</span>
                </div>

                {/* Rating */}
                <div className={styles.rating}>
                    <div className="stars">
                        {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                        ))}
                    </div>
                    <span className={styles.reviewCount}>({product.reviewCount})</span>
                </div>

                {/* Stock */}
                {product.stock < 20 && (
                    <p className={styles.lowStock}>🔥 Only {product.stock} left!</p>
                )}
            </div>
        </Link>
    );
}
