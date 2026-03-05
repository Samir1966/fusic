'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './checkout.module.css';

const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: '📱', desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', label: 'Credit/Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
    { id: 'emi', label: 'EMI (No-Cost)', icon: '📅', desc: 'Split into 3/6/9 months' },
    { id: 'netbanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks' },
    { id: 'wallet', label: 'Wallets', icon: '👛', desc: 'Paytm, Amazon Pay, Mobikwik' },
    { id: 'bnpl', label: 'Buy Now Pay Later', icon: '💰', desc: 'Simpl, LazyPay, ZestMoney' },
    { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' },
];

const kiranaStores = [
    { id: 'k1', name: 'Sharma General Store', distance: '0.8 km', address: 'Near Rajput Chowk, Main Road', timing: '8 AM – 10 PM' },
    { id: 'k2', name: 'Gupta Kirana Corner', distance: '1.2 km', address: 'Opposite SBI Bank, Market Lane', timing: '7 AM – 9 PM' },
    { id: 'k3', name: 'Patel Provision Store', distance: '2.1 km', address: 'Near Bus Stand, Station Road', timing: '9 AM – 11 PM' },
];

export default function CheckoutPage() {
    const { items, cartTotal, cartSavings, clearCart } = useCart();
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('upi');
    const [emiPlan, setEmiPlan] = useState(3);
    const [deliveryType, setDeliveryType] = useState('home');
    const [selectedStore, setSelectedStore] = useState('');
    const [address, setAddress] = useState({
        name: '', line1: '', line2: '', city: '', state: '', pincode: '', email: ''
    });

    const [placingOrder, setPlacingOrder] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [user, setUser] = useState(null);

    // Fetch user session on load
    useEffect(() => {
        fetch('/api/auth/customer')
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUser(data.user);
                    const p = data.user.profile || {};
                    // Pre-fill address and phone if available
                    setAddress(prev => ({
                        ...prev,
                        name: p.name || prev.name,
                        line1: p.address || prev.line1,
                        city: p.city || prev.city,
                        pincode: p.pincode || prev.pincode
                    }));
                    if (p.phone) setPhone(p.phone);

                    // Skip Step 1 (Phone verification) if logged in
                    setStep(2);
                }
            })
            .catch(err => console.error("Session check failed", err));
    }, []);

    const sendOtp = () => {
        if (phone.length === 10) setOtpSent(true);
    };

    const verifyOtp = () => {
        if (otp.length === 4) setStep(2);
    };

    const shipping = cartTotal >= 599 ? 0 : 49;
    const total = cartTotal + shipping;

    const handlePlaceOrder = async () => {
        setPlacingOrder(true);
        try {
            // Map cart items to API format
            const payload = {
                name: deliveryType === 'kirana' ? 'Kirana Pickup Customer' : address.name,
                phone: phone,
                email: user ? user.email : (address.email || null),
                address: deliveryType === 'kirana' ? kiranaStores.find(s => s.id === selectedStore)?.address : address.line1,
                city: deliveryType === 'kirana' ? 'Local' : address.city,
                state: deliveryType === 'kirana' ? 'Local' : address.state,
                pincode: deliveryType === 'kirana' ? '000000' : address.pincode,
                subtotal: cartTotal,
                discountAmount: cartSavings || 0,
                shippingCost: shipping || 0,
                total: total,
                paymentMethod: selectedPayment,
                notes: '',
                items: items.map(item => ({
                    productId: item.id,
                    name: item.name,
                    imageUrl: item.imageUrl,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color || item.colorNames?.[0] || 'Default',
                    price: item.price
                }))
            };

            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (res.ok) {
                setOrderSuccess(data.order.order_number);
                clearCart();
            } else {
                alert(data.error || 'Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong. Please check your connection.');
        } finally {
            setPlacingOrder(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="container">
                <div className={styles.empty} style={{ marginTop: '4rem', padding: '4rem 1rem' }}>
                    <span className={styles.emptyIcon} style={{ background: '#4CAF50', color: 'white' }}>🎉</span>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Order Placed Successfully!</h2>
                    <p style={{ fontSize: '1.2rem', color: '#888' }}>Your Order Number is <strong style={{ color: '#fff' }}>{orderSuccess}</strong></p>
                    <p style={{ marginTop: '1rem', color: '#aaa', maxWidth: '400px', margin: '1rem auto' }}>
                        We've received your order and are getting it ready. You'll receive an SMS confirmation shortly.
                    </p>
                    <Link href="/" className="btn btn-primary btn-lg" style={{ marginTop: '2rem' }}>Continue Shopping</Link>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className={styles.empty}>
                <span className={styles.emptyIcon}>🛒</span>
                <h2>Your cart is empty</h2>
                <p>Add some awesome stuff to checkout!</p>
                <Link href="/" className="btn btn-primary btn-lg">Shop Now</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <div className={styles.page}>
                <h1 className={styles.pageTitle}>Checkout</h1>

                <div className={styles.progress}>
                    {['Login', 'Address', 'Payment'].map((s, i) => (
                        <div key={i} className={`${styles.progressStep} ${step > i ? styles.stepDone : ''} ${step === i + 1 ? styles.stepActive : ''}`}>
                            <span className={styles.stepNum}>{step > i + 1 ? '✓' : i + 1}</span>
                            <span className={styles.stepLabel}>{s}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.layout}>
                    <div className={styles.main}>
                        {step === 1 && !user && (
                            <div className={styles.card}>
                                <h3>📱 Login or Guest Checkout</h3>
                                <p className={styles.cardDesc}>Enter your phone number to continue.</p>

                                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255, 76, 41, 0.1)', borderRadius: '8px', border: '1px solid rgba(255, 76, 41, 0.2)' }}>
                                    <strong>Want a faster checkout?</strong>
                                    <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '0.5rem 0' }}>Login to your FUSIC account to skip this step and use saved addresses.</p>
                                    <Link href="/login" className="btn btn-secondary">Login / Create Account</Link>
                                </div>

                                <div className={styles.phoneRow}>
                                    <span className={styles.countryCode}>+91</span>
                                    <input
                                        type="tel"
                                        placeholder="Enter mobile number"
                                        maxLength={10}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                        className={styles.phoneInput}
                                    />
                                    <button className="btn btn-primary" onClick={sendOtp}>
                                        {otpSent ? 'Resend' : 'Send OTP'}
                                    </button>
                                </div>
                                {otpSent && (
                                    <div className={styles.otpSection}>
                                        <p className={styles.otpSent}>✅ OTP sent to +91 {phone}</p>
                                        <input
                                            type="text"
                                            placeholder="Enter 4-digit OTP"
                                            maxLength={4}
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                            className={styles.otpInput}
                                        />
                                        <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={verifyOtp} disabled={otp.length < 4}>
                                            Verify & Continue →
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 2 && (
                            <div className={styles.card}>
                                <h3>📍 Delivery Options</h3>
                                <div className={styles.deliveryTabs}>
                                    <button
                                        className={`${styles.deliveryTab} ${deliveryType === 'home' ? styles.deliveryTabActive : ''}`}
                                        onClick={() => setDeliveryType('home')}
                                    >
                                        🏠 Home Delivery
                                    </button>
                                    <button
                                        className={`${styles.deliveryTab} ${deliveryType === 'kirana' ? styles.deliveryTabActive : ''}`}
                                        onClick={() => setDeliveryType('kirana')}
                                    >
                                        🏪 Kirana Store Pickup
                                    </button>
                                </div>

                                {deliveryType === 'home' && (
                                    <div className={styles.form}>
                                        <div className={styles.formRow}>
                                            <div className={styles.field}>
                                                <label>Full Name</label>
                                                <input type="text" placeholder="Enter your name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Email (Optional)</label>
                                                <input type="email" placeholder="For order tracking" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className={styles.field}>
                                            <label>Address Line 1</label>
                                            <input type="text" placeholder="House no, Building, Street" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
                                        </div>
                                        <div className={styles.field}>
                                            <label>Address Line 2</label>
                                            <input type="text" placeholder="Area, Colony (optional)" value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} />
                                        </div>
                                        <div className={styles.formRow}>
                                            <div className={styles.field}>
                                                <label>Pincode</label>
                                                <input type="text" placeholder="6-digit" maxLength={6} value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })} />
                                            </div>
                                            <div className={styles.field}>
                                                <label>City</label>
                                                <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                                            </div>
                                            <div className={styles.field}>
                                                <label>State</label>
                                                <select value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}>
                                                    <option value="">Select</option>
                                                    <option>Odisha</option>
                                                    <option>Jharkhand</option>
                                                    <option>West Bengal</option>
                                                    <option>Bihar</option>
                                                    <option>Others</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => setStep(3)} disabled={!address.name || !address.line1 || !address.pincode || !address.city || !address.state}>
                                            Continue to Payment →
                                        </button>
                                    </div>
                                )}

                                {deliveryType === 'kirana' && (
                                    <div className={styles.kiranaSection}>
                                        <p className={styles.kiranaInfo}>📦 Pick up from a nearby store — <strong>save ₹49 on shipping!</strong></p>
                                        <div className={styles.kiranaList}>
                                            {kiranaStores.map(store => (
                                                <button
                                                    key={store.id}
                                                    className={`${styles.kiranaCard} ${selectedStore === store.id ? styles.kiranaActive : ''}`}
                                                    onClick={() => setSelectedStore(store.id)}
                                                >
                                                    <div className={styles.kiranaHeader}>
                                                        <span className={styles.kiranaName}>{store.name}</span>
                                                        <span className={styles.kiranaDistance}>{store.distance}</span>
                                                    </div>
                                                    <p className={styles.kiranaAddr}>{store.address}</p>
                                                    <p className={styles.kiranaTiming}>⏰ {store.timing}</p>
                                                    <span className={styles.kiranaRadio}>{selectedStore === store.id ? '◉' : '○'}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => setStep(3)} disabled={!selectedStore}>
                                            Continue to Payment →
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 3 && (
                            <div className={styles.card}>
                                <h3>💳 Payment Method</h3>
                                {total >= 999 && (
                                    <div className={styles.emiBanner}>
                                        🎉 No-Cost EMI available from <strong>₹{Math.ceil(total / 3)}/month</strong>
                                    </div>
                                )}
                                <div className={styles.paymentList}>
                                    {paymentMethods.filter(pm => total >= 999 || pm.id !== 'emi').map(pm => (
                                        <button
                                            key={pm.id}
                                            className={`${styles.paymentOption} ${selectedPayment === pm.id ? styles.paymentActive : ''}`}
                                            onClick={() => setSelectedPayment(pm.id)}
                                        >
                                            <span className={styles.payIcon}>{pm.icon}</span>
                                            <div>
                                                <p className={styles.payLabel}>{pm.label}</p>
                                                <p className={styles.payDesc}>{pm.desc}</p>
                                            </div>
                                            <span className={styles.payRadio}>
                                                {selectedPayment === pm.id ? '◉' : '○'}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {selectedPayment === 'emi' && (
                                    <div className={styles.emiSection}>
                                        <h4>Select EMI Plan</h4>
                                        <div className={styles.emiPlans}>
                                            {[3, 6, 9].map(months => (
                                                <button
                                                    key={months}
                                                    className={`${styles.emiPlan} ${emiPlan === months ? styles.emiPlanActive : ''}`}
                                                    onClick={() => setEmiPlan(months)}
                                                >
                                                    <span className={styles.emiMonths}>{months} months</span>
                                                    <span className={styles.emiAmount}>₹{Math.ceil(total / months)}/mo</span>
                                                    <span className={styles.emiTotal}>Total: ₹{total}</span>
                                                    {months === 3 && <span className={styles.emiTag}>POPULAR</span>}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button
                                    className="btn btn-primary btn-lg"
                                    style={{ width: '100%', marginTop: '16px' }}
                                    onClick={handlePlaceOrder}
                                    disabled={placingOrder}
                                >
                                    {placingOrder ? 'Processing...' : (selectedPayment === 'emi' ? `Start EMI ₹${Math.ceil(total / emiPlan)}/mo` : `Pay ₹${total}`)} →
                                </button>
                                <p className={styles.secureNote}>🔒 100% secure payment. Your data is encrypted.</p>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className={styles.sidebar}>
                        <div className={styles.summaryCard}>
                            <h3>Order Summary</h3>
                            <div className={styles.summaryItems}>
                                {items.map(item => (
                                    <div key={`${item.id}-${item.size}`} className={styles.summaryItem}>
                                        <img src={item.imageUrl} alt={item.name} className={styles.summaryItemImage} style={{ objectFit: 'cover' }} />
                                        <div className={styles.summaryItemInfo}>
                                            <p className={styles.summaryItemName}>{item.name}</p>
                                            <p className={styles.summaryItemMeta}>{item.color} • {item.size} • Qty: {item.quantity}</p>
                                            <p className={styles.summaryItemPrice}>₹{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.summaryBreak}></div>
                            <div className={styles.summaryRow}>
                                <span>Subtotal</span><span>₹{cartTotal}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Shipping</span>
                                <span>{shipping === 0 ? <span style={{ color: 'var(--clr-success)' }}>FREE</span> : `₹${shipping}`}</span>
                            </div>
                            {cartSavings > 0 && (
                                <div className={`${styles.summaryRow} ${styles.savingsRow}`}>
                                    <span>You Save</span><span>-₹{cartSavings}</span>
                                </div>
                            )}
                            <div className={styles.summaryBreak}></div>
                            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                <span>Total</span><span>₹{total}</span>
                            </div>
                        </div>

                        <div className={styles.trustSection}>
                            <p>🔒 Secure Checkout</p>
                            <p>📦 COD Available</p>
                            <p>↩️ 7 Day Easy Returns</p>
                            <p>📱 WhatsApp + SMS Confirmation</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
