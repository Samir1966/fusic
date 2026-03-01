'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { normalizeProduct } from '@/lib/normalize';
import styles from './ProductPage.module.css';

export default function ProductPage() {
    const params = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [activeImage, setActiveImage] = useState(0);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [pincode, setPincode] = useState('');
    const [deliveryInfo, setDeliveryInfo] = useState(null);
    const [showTryAtHome, setShowTryAtHome] = useState(false);

    useEffect(() => {
        // Fetch product by slug (or ID)
        Promise.all([
            fetch(`/api/products/${params.id}`).then(r => r.json()),
            fetch(`/api/products?limit=5`).then(r => r.json()) // for related products
        ])
            .then(([productData, relatedData]) => {
                if (productData.product) {
                    const normalizedProduct = normalizeProduct(productData.product);
                    setProduct(normalizedProduct);
                    setSelectedColor(normalizedProduct.colorNames?.[0] || '');

                    // Set related products (excluding current one)
                    let related = (relatedData.products || [])
                        .map(normalizeProduct)
                        .filter(p => p.id !== normalizedProduct.id);
                    setRelatedProducts(related.slice(0, 4));
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [params.id]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        addToCart(product, selectedSize, selectedColor);
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        addToCart(product, selectedSize, selectedColor);
    };

    const checkDelivery = () => {
        if (pincode.length === 6) {
            setDeliveryInfo({
                available: true,
                date: 'Feb 27 — Mar 1', // In a real app, calculate based on pincode
                cod: true,
            });
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '100px 0' }}>Loading product details...</div>;
    if (!product) return <div style={{ textAlign: 'center', padding: '100px 0' }}>Product not found</div>;

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Breadcrumbs */}
                <div className={styles.breadcrumbs}>
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <Link href={`/shop?category=${product.category}`}>{product.category}</Link>
                    <span>/</span>
                    <span>{product.name}</span>
                </div>

                <div className={styles.layout}>
                    {/* Image Gallery */}
                    <div className={styles.gallery}>
                        <div className={styles.mainImage}>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className={styles.mainImg}
                            />
                            {product.newArrival && <span className={styles.newBadge}>NEW</span>}
                            {product.discount > 0 && (
                                <span className={styles.discountBadge}>-{product.discount}%</span>
                            )}
                        </div>
                        <div className={styles.thumbs}>
                            {[0, 1, 2].map(i => (
                                <button
                                    key={i}
                                    className={`${styles.thumb} ${activeImage === i ? styles.thumbActive : ''}`}
                                    onClick={() => setActiveImage(i)}
                                >
                                    {i === 2 ? (
                                        <span className={styles.thumbLabel}>📹 360°</span>
                                    ) : (
                                        <img src={product.imageUrl} alt={`${product.name} view ${i + 1}`} className={styles.thumbImg} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className={styles.info}>
                        <div className={styles.ratingRow}>
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                                ))}
                            </div>
                            <span className={styles.ratingText}>{product.rating} ({product.reviewCount} reviews)</span>
                        </div>

                        <h1 className={styles.title}>{product.name}</h1>
                        <p className={styles.desc}>{product.description}</p>

                        {/* Price */}
                        <div className={styles.priceBlock}>
                            <span className={styles.price}>₹{product.price}</span>
                            {product.originalPrice > product.price && (
                                <>
                                    <span className={styles.mrp}>MRP ₹{product.originalPrice}</span>
                                    <span className={styles.discount}>{product.discount}% OFF</span>
                                </>
                            )}
                        </div>
                        <p className={styles.tax}>Inclusive of all taxes</p>
                        {product.price >= 999 && (
                            <p className={styles.emiHint}>📅 No-Cost EMI from <strong>₹{Math.ceil(product.price / 3)}/month</strong></p>
                        )}

                        {/* Colors */}
                        {product.colors && product.colors.length > 0 && (
                            <div className={styles.optionGroup}>
                                <h4>Color: <span className={styles.selectedValue}>{selectedColor}</span></h4>
                                <div className={styles.colorOptions}>
                                    {product.colors.map((color, i) => (
                                        <button
                                            key={i}
                                            className={`${styles.colorBtn} ${selectedColor === product.colorNames[i] ? styles.colorActive : ''}`}
                                            style={{ background: color, border: color === '#FFFFFF' || color === '#FAF7F2' ? '2px solid #ddd' : '2px solid transparent' }}
                                            onClick={() => setSelectedColor(product.colorNames[i])}
                                            title={product.colorNames[i]}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sizes */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className={styles.optionGroup}>
                                <div className={styles.sizeHeader}>
                                    <h4>Size: <span className={styles.selectedValue}>{selectedSize || 'Select'}</span></h4>
                                    <button className={styles.sizeGuideBtn} onClick={() => setShowSizeGuide(!showSizeGuide)}>
                                        📏 Size Guide
                                    </button>
                                </div>
                                <div className={styles.sizeOptions}>
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeActive : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Guide Modal */}
                        {showSizeGuide && (
                            <div className={styles.sizeGuide}>
                                <h4>📏 Smart Size Assistant</h4>
                                <p>Enter your measurements for a perfect fit:</p>
                                <div className={styles.sizeInputs}>
                                    <div>
                                        <label>Height (cm)</label>
                                        <input type="number" placeholder="170" />
                                    </div>
                                    <div>
                                        <label>Weight (kg)</label>
                                        <input type="number" placeholder="65" />
                                    </div>
                                    <div>
                                        <label>Fit Preference</label>
                                        <select>
                                            <option>Regular</option>
                                            <option>Slim</option>
                                            <option>Oversized</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="btn btn-secondary btn-sm">Get Recommendation</button>
                            </div>
                        )}

                        {/* Stock */}
                        {product.stock > 0 && product.stock < 30 && (
                            <div className={styles.stockAlert}>
                                🔥 Only {product.stock} left in stock — order soon!
                            </div>
                        )}
                        {product.stock === 0 && (
                            <div className={styles.stockAlert} style={{ color: '#FF4057', background: 'rgba(255,64,87,0.1)', borderColor: 'rgba(255,64,87,0.3)' }}>
                                ❌ Out of stock
                            </div>
                        )}

                        {/* Delivery */}
                        <div className={styles.delivery}>
                            <h4>📦 Delivery</h4>
                            <div className={styles.pincodeRow}>
                                <input
                                    type="text"
                                    placeholder="Enter pincode"
                                    maxLength={6}
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                                    className={styles.pincodeInput}
                                />
                                <button className="btn btn-secondary btn-sm" onClick={checkDelivery}>Check</button>
                            </div>
                            {deliveryInfo && (
                                <div className={styles.deliveryResult}>
                                    <p>✅ Delivery by <strong>{deliveryInfo.date}</strong></p>
                                    {deliveryInfo.cod && <p>💵 Cash on Delivery available</p>}
                                    <p>↩️ 7-day easy returns</p>
                                </div>
                            )}
                        </div>

                        {/* Try at Home */}
                        <div className={styles.tryAtHome}>
                            <div className={styles.tryHeader} onClick={() => setShowTryAtHome(!showTryAtHome)}>
                                <span>👕 TRY AT HOME — Select 2 sizes, pay ₹50 refundable deposit</span>
                                <span>{showTryAtHome ? '▲' : '▼'}</span>
                            </div>
                            {showTryAtHome && (
                                <div className={styles.tryContent}>
                                    <p>Select 2 sizes, try both at home. Return the one that doesn&apos;t fit. ₹50 deposit refunded on return!</p>
                                    <button className="btn btn-outline btn-sm">Try at Home →</button>
                                </div>
                            )}
                        </div>

                        {/* Bundle Offers */}
                        <div className={styles.bundles}>
                            <h4>🎁 Bundle & Save</h4>
                            <div className={styles.bundleCard}>
                                <span className={styles.bundleTag}>SAVE ₹200</span>
                                <p>Buy 2, Get ₹200 Off — Use code <strong>FUSIC200</strong></p>
                            </div>
                            <div className={styles.bundleCard}>
                                <span className={styles.bundleTag}>SAVE ₹500</span>
                                <p>Buy 3, Get ₹500 Off — Use code <strong>FUSIC500</strong></p>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className={styles.details}>
                            <h4>Product Details</h4>
                            <table className={styles.detailsTable}>
                                <tbody>
                                    <tr><td>Fabric</td><td>{product.fabric || 'Premium Cotton'}</td></tr>
                                    <tr><td>Fit</td><td>{product.fit || 'Regular'}</td></tr>
                                    <tr><td>Neck</td><td>Round Neck</td></tr>
                                    <tr><td>Wash Care</td><td>Machine wash cold</td></tr>
                                    <tr><td>Country</td><td>Made in India 🇮🇳</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className={styles.related}>
                        <h2 className="section-title">You May Also Like</h2>
                        <div className={styles.relatedGrid}>
                            {relatedProducts.map((p) => (
                                <Link key={p.id} href={`/product/${p.slug}`} className={styles.relatedCard}>
                                    <div className={styles.relatedImage}>
                                        <img src={p.imageUrl} alt={p.name} className={styles.relatedImg} />
                                    </div>
                                    <h4>{p.name}</h4>
                                    <div className="price">
                                        <span className="price-current">₹{p.price}</span>
                                        {p.originalPrice > p.price && <span className="price-original">₹{p.originalPrice}</span>}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Bottom Bar */}
            <div className={styles.stickyBar}>
                <div className={styles.stickyPrice}>
                    <span className={styles.stickyCurrentPrice}>₹{product.price}</span>
                    {product.originalPrice > product.price && <span className={styles.stickyOrigPrice}>₹{product.originalPrice}</span>}
                </div>
                <div className={styles.stickyActions}>
                    <button className="btn btn-secondary btn-lg" onClick={handleAddToCart} disabled={product.stock === 0}>
                        🛒 Add to Cart
                    </button>
                    <button className="btn btn-primary btn-lg" onClick={handleBuyNow} disabled={product.stock === 0}>
                        {product.stock === 0 ? 'Out of Stock' : '⚡ Buy Now'}
                    </button>
                </div>
            </div>
        </div>
    );
}
