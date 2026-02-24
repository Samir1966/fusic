import styles from '../info.module.css';

export default function ShippingPage() {
    return (
        <>
            <div className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroOverlay} style={{ background: 'linear-gradient(135deg, #10B981 0%, #3F37C9 100%)' }}></div>
                </div>
                <div className={`container ${styles.heroContent}`}>
                    <span className={styles.heroEmoji}>🚚</span>
                    <h1 className={styles.heroTitle}>Shipping Policy</h1>
                    <p className={styles.heroSub}>From our warehouse to your doorstep — fast, reliable, trackable.</p>
                </div>
            </div>

            <div className="container">
                <div className={styles.page}>
                    <div className={styles.policyContent}>

                        <div className={styles.statsStrip} style={{ marginBottom: '2rem' }}>
                            <div className={styles.statItem}>
                                <div className={styles.statNum}>FREE</div>
                                <div className={styles.statLabel}>Shipping above ₹499</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNum}>3-5</div>
                                <div className={styles.statLabel}>Days Metro Cities</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNum}>29K+</div>
                                <div className={styles.statLabel}>Pincodes Served</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNum}>24/7</div>
                                <div className={styles.statLabel}>Order Tracking</div>
                            </div>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>📦 Shipping Rates</h3>
                            <table className={styles.sizeTable}>
                                <thead>
                                    <tr>
                                        <th>Order Value</th>
                                        <th>Shipping Cost</th>
                                        <th>Delivery Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Above ₹499</td><td style={{ color: '#10B981', fontWeight: 700 }}>FREE 🎉</td><td>4-7 days</td></tr>
                                    <tr><td>Below ₹499</td><td>₹49</td><td>4-7 days</td></tr>
                                    <tr><td>Express Delivery</td><td>₹99</td><td>2-3 days</td></tr>
                                    <tr><td>Kirana Pickup</td><td style={{ color: '#10B981', fontWeight: 700 }}>FREE</td><td>3-5 days</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>🗺️ Delivery by Region</h3>
                            <table className={styles.sizeTable}>
                                <thead>
                                    <tr>
                                        <th>Region</th>
                                        <th>Cities</th>
                                        <th>Standard</th>
                                        <th>Express</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td style={{ fontWeight: 700 }}>Metro Cities</td><td>Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata</td><td>3-5 days</td><td>1-2 days</td></tr>
                                    <tr><td style={{ fontWeight: 700 }}>Tier-2 Cities</td><td>Bhubaneswar, Ranchi, Lucknow, Jaipur, Pune, Ahmedabad</td><td>4-6 days</td><td>2-3 days</td></tr>
                                    <tr><td style={{ fontWeight: 700 }}>Tier-3 / Rural</td><td>Other pincodes across India</td><td>5-10 days</td><td>3-5 days</td></tr>
                                    <tr><td style={{ fontWeight: 700 }}>North-East</td><td>Assam, Meghalaya, Mizoram, Nagaland, etc.</td><td>7-12 days</td><td>4-6 days</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>📱 Order Tracking</h3>
                            <p>Once your order is dispatched, you'll receive:</p>
                            <ul>
                                <li><strong>WhatsApp update</strong> with tracking link (instant)</li>
                                <li><strong>SMS notification</strong> with tracking number</li>
                                <li><strong>Email confirmation</strong> with detailed tracking info</li>
                                <li>Live tracking available on our website → Track Order page</li>
                            </ul>
                            <div className={styles.policyHighlight}>
                                <p>📲 Reply "STATUS" to our WhatsApp number anytime to get real-time updates!</p>
                            </div>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>🏪 Kirana Store Pickup</h3>
                            <p>Save on shipping! Choose "Kirana Store Pickup" at checkout to collect your order from a nearby partner store. Benefits:</p>
                            <ul>
                                <li>100% free — no shipping charges regardless of order value</li>
                                <li>Pick up at your convenience during store hours</li>
                                <li>Safe and secure handover with OTP verification</li>
                                <li>Available in select cities (expanding fast!)</li>
                            </ul>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>⚠️ Important Notes</h3>
                            <ul>
                                <li>Delivery timelines are estimates and may vary during festivals, sales, or extreme weather</li>
                                <li>Ensure correct address and phone number — our courier partner will call before delivery</li>
                                <li>For COD orders, please keep exact change ready</li>
                                <li>Multiple items in one order may be shipped in separate packages</li>
                                <li>We currently ship only within India. International shipping coming soon!</li>
                            </ul>
                        </div>

                        <p className={styles.lastUpdated}>Last updated: February 2026 · Shipping partner: Delhivery, Shiprocket</p>
                    </div>
                </div>
            </div>
        </>
    );
}
