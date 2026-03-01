import styles from '../info.module.css';

export default function PrivacyPage() {
    return (
        <>
            <div className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroOverlay} style={{ background: 'linear-gradient(135deg, #3F37C9 0%, #1a1a1a 100%)' }}></div>
                </div>
                <div className={`container ${styles.heroContent}`}>
                    <span className={styles.heroEmoji}>🔒</span>
                    <h1 className={styles.heroTitle}>Privacy Policy</h1>
                    <p className={styles.heroSub}>Your data is sacred. Here's exactly how we protect it.</p>
                </div>
            </div>

            <div className="container">
                <div className={styles.page}>
                    <div className={styles.policyContent}>

                        <div className={styles.policyCard}>
                            <h3>🤝 Our Promise</h3>
                            <p>At FUSIC, we believe your personal data belongs to you — period. We collect only what's needed to deliver your orders and make your shopping experience better. We never sell your data to third parties. Ever.</p>
                            <div className={styles.policyHighlight}>
                                <p>✅ Your data is encrypted with 256-bit SSL. We're PCI DSS compliant. No exceptions.</p>
                            </div>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>📋 What We Collect</h3>
                            <ul>
                                <li><strong>Account Info:</strong> Name, phone number, email address — to create your account and send order updates.</li>
                                <li><strong>Delivery Address:</strong> Your shipping address — so we can deliver your goodies to the right place.</li>
                                <li><strong>Payment Info:</strong> Card/UPI details are processed by Razorpay (our payment partner) and never stored on our servers.</li>
                                <li><strong>Browsing Data:</strong> Pages visited, products viewed — to show you relevant recommendations (you can opt out anytime).</li>
                                <li><strong>Device Info:</strong> Browser type, OS, screen size — to optimize your experience across devices.</li>
                            </ul>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>🛡️ How We Use Your Data</h3>
                            <ul>
                                <li>Processing and delivering your orders</li>
                                <li>Sending order updates via SMS, WhatsApp, and email</li>
                                <li>Personalizing your shopping experience</li>
                                <li>Sending promotional offers (only if you opt in!)</li>
                                <li>Improving our website and products</li>
                                <li>Preventing fraud and unauthorized transactions</li>
                            </ul>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>🍪 Cookies</h3>
                            <p>We use cookies to remember your preferences (like language selection and cart items), analyze traffic, and improve performance. You can disable cookies in your browser settings — but some features may not work perfectly without them.</p>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>🤚 Your Rights</h3>
                            <ul>
                                <li><strong>Access:</strong> Request a copy of all data we hold about you</li>
                                <li><strong>Delete:</strong> Ask us to permanently delete your account and data</li>
                                <li><strong>Opt-out:</strong> Unsubscribe from marketing emails/SMS anytime</li>
                                <li><strong>Correct:</strong> Update or fix any incorrect personal information</li>
                            </ul>
                            <p>To exercise any of these rights, email us at <strong>privacy@fusic.store</strong> or WhatsApp us. We'll respond within 48 hours.</p>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>👶 Children's Privacy</h3>
                            <p>FUSIC is intended for users aged 13 and above. We do not knowingly collect data from children under 13. If you believe we have collected data from a minor, please contact us immediately at privacy@fusic.store.</p>
                        </div>

                        <p className={styles.lastUpdated}>Last updated: February 2026 · Questions? Email privacy@fusic.store</p>
                    </div>
                </div>
            </div>
        </>
    );
}
