'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import styles from './account.module.css';

const mockOrders = [
    { id: 'FUS-20260201', date: 'Feb 1, 2026', status: 'Delivered', total: 1598, items: 2 },
    { id: 'FUS-20260115', date: 'Jan 15, 2026', status: 'Delivered', total: 799, items: 1 },
    { id: 'FUS-20260220', date: 'Feb 20, 2026', status: 'Shipped', total: 2498, items: 3 },
];

export default function AccountPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
            <AccountContent />
        </Suspense>
    );
}

function AccountContent() {
    const searchParams = useSearchParams();
    const initialTab = searchParams.get('tab') || 'profile';
    const [activeTab, setActiveTab] = useState(initialTab);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [phone, setPhone] = useState('');

    const tabs = [
        { id: 'profile', label: '👤 Profile', icon: '👤' },
        { id: 'orders', label: '📦 Orders', icon: '📦' },
        { id: 'wishlist', label: '♡ Wishlist', icon: '♡' },
        { id: 'loyalty', label: '🏆 Loyalty', icon: '🏆' },
        { id: 'referral', label: '🎁 Referral', icon: '🎁' },
    ];

    if (!isLoggedIn) {
        return (
            <div className={styles.loginPage}>
                <div className={styles.loginCard}>
                    <h2>Welcome to FUSIC ✨</h2>
                    <p>Login with your phone number</p>
                    <div className={styles.loginForm}>
                        <div className={styles.phoneInputRow}>
                            <span>+91</span>
                            <input
                                type="tel"
                                placeholder="Enter mobile number"
                                maxLength={10}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                            />
                        </div>
                        <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => setIsLoggedIn(true)}>
                            Send OTP →
                        </button>
                        <p className={styles.loginNote}>We&apos;ll send a 4-digit code to verify your number</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className={styles.page}>
                <div className={styles.sidebar}>
                    <div className={styles.avatar}>
                        <span>😎</span>
                    </div>
                    <h3 className={styles.userName}>FUSIC Fan</h3>
                    <p className={styles.userPhone}>+91 {phone || '7077991009'}</p>

                    <nav className={styles.tabs}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className={styles.content}>
                    {activeTab === 'profile' && (
                        <div className={styles.section}>
                            <h2>My Profile</h2>
                            <div className={styles.profileForm}>
                                <div className={styles.fieldGroup}>
                                    <label>Full Name</label>
                                    <input type="text" placeholder="Your name" />
                                </div>
                                <div className={styles.fieldGroup}>
                                    <label>Email</label>
                                    <input type="email" placeholder="your@email.com" />
                                </div>
                                <div className={styles.fieldGroup}>
                                    <label>Saved Size</label>
                                    <div className={styles.savedSizes}>
                                        {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                                            <button key={s} className={`${styles.sizeChip} ${s === 'L' ? styles.sizeSelected : ''}`}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button className="btn btn-primary">Save Changes</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className={styles.section}>
                            <h2>My Orders</h2>
                            <div className={styles.orderList}>
                                {mockOrders.map(order => (
                                    <div key={order.id} className={styles.orderCard}>
                                        <div className={styles.orderHeader}>
                                            <div>
                                                <p className={styles.orderId}>{order.id}</p>
                                                <p className={styles.orderDate}>{order.date} • {order.items} items</p>
                                            </div>
                                            <span className={`${styles.orderStatus} ${order.status === 'Delivered' ? styles.delivered : styles.shipped}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className={styles.orderFooter}>
                                            <span className={styles.orderTotal}>₹{order.total}</span>
                                            <button className="btn btn-outline btn-sm">Track Order</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'wishlist' && (
                        <div className={styles.section}>
                            <h2>My Wishlist ♡</h2>
                            <div className={styles.wishlistGrid}>
                                {products.slice(0, 4).map((p, i) => (
                                    <ProductCard key={p.id} product={p} index={i} />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'loyalty' && (
                        <div className={styles.section}>
                            <h2>Loyalty Points 🏆</h2>
                            <div className={styles.loyaltyCard}>
                                <div className={styles.loyaltyPoints}>
                                    <span className={styles.pointsNum}>1,250</span>
                                    <span className={styles.pointsLabel}>Points Available</span>
                                </div>
                                <p className={styles.pointsValue}>Worth ₹125 in discounts!</p>
                                <div className={styles.loyaltyTiers}>
                                    <div className={`${styles.tier} ${styles.tierActive}`}>🥉 Bronze</div>
                                    <div className={styles.tier}>🥈 Silver</div>
                                    <div className={styles.tier}>🥇 Gold</div>
                                    <div className={styles.tier}>💎 Diamond</div>
                                </div>
                                <p className={styles.tierProgress}>Earn 750 more points to reach Silver!</p>
                            </div>
                            <div className={styles.earnWays}>
                                <h4>How to Earn Points</h4>
                                <div className={styles.earnGrid}>
                                    <div className={styles.earnItem}>
                                        <span>🛒</span>
                                        <p>₹1 = 1 point on every purchase</p>
                                    </div>
                                    <div className={styles.earnItem}>
                                        <span>⭐</span>
                                        <p>50 points for writing a review</p>
                                    </div>
                                    <div className={styles.earnItem}>
                                        <span>🎂</span>
                                        <p>500 bonus on your birthday</p>
                                    </div>
                                    <div className={styles.earnItem}>
                                        <span>🤝</span>
                                        <p>200 points per referral</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'referral' && (
                        <div className={styles.section}>
                            <h2>Refer & Earn 🎁</h2>
                            <div className={styles.referralCard}>
                                <h3>Share FUSIC, Get Rewarded!</h3>
                                <p>Your friend gets <strong>₹100 off</strong> their first order. You earn <strong>200 loyalty points</strong>!</p>
                                <div className={styles.referralCode}>
                                    <span>FUSIC-FRIEND-2026</span>
                                    <button className="btn btn-sm btn-secondary">Copy</button>
                                </div>
                                <div className={styles.shareButtons}>
                                    <button className="btn btn-sm" style={{ background: '#25D366', color: '#fff' }}>WhatsApp</button>
                                    <button className="btn btn-sm" style={{ background: '#1DA1F2', color: '#fff' }}>Twitter</button>
                                    <button className="btn btn-sm btn-outline">Copy Link</button>
                                </div>
                                <div className={styles.referralStats}>
                                    <div><strong>12</strong><span>Referred</span></div>
                                    <div><strong>8</strong><span>Joined</span></div>
                                    <div><strong>1,600</strong><span>Points Earned</span></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
