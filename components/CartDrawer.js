'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
    const { items, cartCount, cartTotal, cartSavings, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
            <div className={styles.overlay} onClick={() => setIsCartOpen(false)}></div>
            <div className={styles.drawer}>
                <div className={styles.header}>
                    <h3>🛒 Your Cart ({cartCount})</h3>
                    <button className={styles.close} onClick={() => setIsCartOpen(false)}>✕</button>
                </div>

                {items.length === 0 ? (
                    <div className={styles.empty}>
                        <span className={styles.emptyIcon}>🛒</span>
                        <p>Your cart is empty</p>
                        <button className="btn btn-primary" onClick={() => setIsCartOpen(false)}>
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={styles.items}>
                            {items.map(item => (
                                <div key={`${item.id}-${item.size}-${item.color}`} className={styles.item}>
                                    <div className={styles.itemImage} style={{ background: item.gradient }}>
                                        <span>👕</span>
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h4>{item.name}</h4>
                                        <p className={styles.itemMeta}>Size: {item.size} • {item.color}</p>
                                        <div className={styles.itemPrice}>
                                            <span className={styles.itemCurrentPrice}>₹{item.price}</span>
                                            <span className={styles.itemOrigPrice}>₹{item.originalPrice}</span>
                                        </div>
                                        <div className={styles.qtyControls}>
                                            <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className={styles.footer}>
                            {cartSavings > 0 && (
                                <div className={styles.savings}>
                                    🎉 You&apos;re saving ₹{cartSavings} on this order!
                                </div>
                            )}
                            <div className={styles.totalRow}>
                                <span>Subtotal</span>
                                <span className={styles.totalPrice}>₹{cartTotal}</span>
                            </div>
                            <p className={styles.shipping}>Free shipping on orders above ₹599</p>
                            <Link
                                href="/checkout"
                                className="btn btn-primary btn-lg"
                                style={{ width: '100%' }}
                                onClick={() => setIsCartOpen(false)}
                            >
                                Proceed to Checkout →
                            </Link>
                            <button
                                className={styles.continueBtn}
                                onClick={() => setIsCartOpen(false)}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
