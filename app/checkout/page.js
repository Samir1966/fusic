'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import styles from './checkout.module.css';

const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: '📱', desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', label: 'Credit/Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks' },
    { id: 'wallet', label: 'Wallets', icon: '👛', desc: 'Paytm, Amazon Pay, Mobikwik' },
    { id: 'bnpl', label: 'Buy Now Pay Later', icon: '📅', desc: 'Simpl, LazyPay, ZestMoney' },
    { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' },
];

export default function CheckoutPage() {
    const { items, cartTotal, cartSavings } = useCart();
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('upi');
    const [address, setAddress] = useState({
        name: '', line1: '', line2: '', city: '', state: '', pincode: '',
    });

    const sendOtp = () => {
        if (phone.length === 10) {
            setOtpSent(true);
        }
    };

    const verifyOtp = () => {
        if (otp.length === 4) {
            setStep(2);
        }
    };

    const shipping = cartTotal >= 599 ? 0 : 49;
    const total = cartTotal + shipping;

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

                {/* Progress */}
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
                        {/* Step 1: Phone OTP */}
                        {step === 1 && (
                            <div className={styles.card}>
                                <h3>📱 Login with Phone</h3>
                                <p className={styles.cardDesc}>Quick guest checkout — no account needed!</p>
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
                                        <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={verifyOtp}>
                                            Verify & Continue →
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 2: Address */}
                        {step === 2 && (
                            <div className={styles.card}>
                                <h3>📍 Delivery Address</h3>
                                <div className={styles.form}>
                                    <div className={styles.formRow}>
                                        <div className={styles.field}>
                                            <label>Full Name</label>
                                            <input type="text" placeholder="Enter your name" value={address.name}
                                                onChange={(e) => setAddress({ ...address, name: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className={styles.field}>
                                        <label>Address Line 1</label>
                                        <input type="text" placeholder="House no, Building, Street" value={address.line1}
                                            onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Address Line 2</label>
                                        <input type="text" placeholder="Area, Colony (optional)" value={address.line2}
                                            onChange={(e) => setAddress({ ...address, line2: e.target.value })} />
                                    </div>
                                    <div className={styles.formRow}>
                                        <div className={styles.field}>
                                            <label>Pincode</label>
                                            <input type="text" placeholder="6-digit pincode" maxLength={6} value={address.pincode}
                                                onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })} />
                                        </div>
                                        <div className={styles.field}>
                                            <label>City</label>
                                            <input type="text" placeholder="City" value={address.city}
                                                onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                                        </div>
                                        <div className={styles.field}>
                                            <label>State</label>
                                            <select value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}>
                                                <option value="">Select</option>
                                                <option>Odisha</option>
                                                <option>Jharkhand</option>
                                                <option>West Bengal</option>
                                                <option>Bihar</option>
                                                <option>Assam</option>
                                                <option>Uttar Pradesh</option>
                                                <option>Madhya Pradesh</option>
                                                <option>Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => setStep(3)}>
                                        Continue to Payment →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Payment */}
                        {step === 3 && (
                            <div className={styles.card}>
                                <h3>💳 Payment Method</h3>
                                <div className={styles.paymentList}>
                                    {paymentMethods.map(pm => (
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
                                <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '16px' }}>
                                    Pay ₹{total} →
                                </button>
                                <p className={styles.secureNote}>🔒 100% secure payment. Your data is encrypted.</p>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className={styles.sidebar}>
                        <div className={styles.summaryCard}>
                            <h3>Order Summary</h3>
                            <div className={styles.summaryItems}>
                                {items.map(item => (
                                    <div key={`${item.id}-${item.size}`} className={styles.summaryItem}>
                                        <div className={styles.summaryItemImage} style={{ background: item.gradient }}>
                                            <span>👕</span>
                                        </div>
                                        <div className={styles.summaryItemInfo}>
                                            <p className={styles.summaryItemName}>{item.name}</p>
                                            <p className={styles.summaryItemMeta}>{item.size} • Qty: {item.quantity}</p>
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
