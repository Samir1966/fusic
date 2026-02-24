import styles from '../info.module.css';

export default function ReturnsPage() {
    return (
        <>
            <div className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroOverlay} style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF4057 100%)' }}></div>
                </div>
                <div className={`container ${styles.heroContent}`}>
                    <span className={styles.heroEmoji}>↩️</span>
                    <h1 className={styles.heroTitle}>Return Policy</h1>
                    <p className={styles.heroSub}>Not happy? No problem. Easiest returns in Indian fashion.</p>
                </div>
            </div>

            <div className="container">
                <div className={styles.page}>
                    <div className={styles.policyContent}>

                        {/* Quick Summary */}
                        <div className={styles.statsStrip} style={{ marginBottom: '2rem' }}>
                            <div className={styles.statItem}>
                                <div className={styles.statNum}>7</div>
                                <div className={styles.statLabel}>Days Return Window</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNum}>FREE</div>
                                <div className={styles.statLabel}>Pickup from Door</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNum}>3-5</div>
                                <div className={styles.statLabel}>Days Refund</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNum}>0</div>
                                <div className={styles.statLabel}>Questions Asked</div>
                            </div>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>✅ Eligible for Return</h3>
                            <ul>
                                <li>Product received is damaged, defective, or different from what was ordered</li>
                                <li>Wrong size delivered (we'll exchange it for free!)</li>
                                <li>Product doesn't match the website description or images</li>
                                <li>You simply changed your mind (yes, that's valid too!)</li>
                            </ul>
                            <div className={styles.policyHighlight}>
                                <p>📦 All returns include FREE doorstep pickup. We send our courier partner to collect from your address.</p>
                            </div>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>🔄 How to Return</h3>
                            <ol>
                                <li><strong>Initiate:</strong> WhatsApp us at +91 98765 43210 with your order number and reason</li>
                                <li><strong>Schedule:</strong> We'll arrange a free pickup within 24-48 hours</li>
                                <li><strong>Pack:</strong> Place the item in the original packaging with tags intact</li>
                                <li><strong>Hand Over:</strong> Give the package to our delivery partner</li>
                                <li><strong>Refund:</strong> Money back in 3-5 business days after quality check</li>
                            </ol>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>💰 Refund Options</h3>
                            <table className={styles.sizeTable}>
                                <thead>
                                    <tr>
                                        <th>Payment Method</th>
                                        <th>Refund To</th>
                                        <th>Timeline</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>UPI</td><td>Original UPI ID</td><td>3-5 days</td></tr>
                                    <tr><td>Credit/Debit Card</td><td>Original card</td><td>5-7 days</td></tr>
                                    <tr><td>Net Banking</td><td>Bank account</td><td>5-7 days</td></tr>
                                    <tr><td>Wallet</td><td>Wallet balance</td><td>24 hours</td></tr>
                                    <tr><td>COD</td><td>Bank transfer or FUSIC credit</td><td>5-7 days</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>❌ Not Eligible for Return</h3>
                            <ul>
                                <li>Items returned after 7 days from delivery</li>
                                <li>Products that have been washed, worn (beyond try-on), or altered</li>
                                <li>Items without original tags and packaging</li>
                                <li>Products marked as "Final Sale" or "Non-returnable" on the product page</li>
                                <li>Innerwear and accessories (for hygiene reasons)</li>
                            </ul>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>🔁 Size Exchanges</h3>
                            <p>Wrong size? We've got you! Size exchanges are <strong>completely free</strong> — we'll ship your new size before picking up the old one. Just WhatsApp us with your order number and desired size.</p>
                            <div className={styles.policyHighlight}>
                                <p>💡 Tip: Check our Size Guide before ordering to find your perfect fit!</p>
                            </div>
                        </div>

                        <p className={styles.lastUpdated}>Last updated: February 2026 · Questions? WhatsApp +91 98765 43210</p>
                    </div>
                </div>
            </div>
        </>
    );
}
