import styles from '../info.module.css';

export default function TermsPage() {
    return (
        <>
            <div className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroOverlay} style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #3F37C9 100%)' }}></div>
                </div>
                <div className={`container ${styles.heroContent}`}>
                    <span className={styles.heroEmoji}>📜</span>
                    <h1 className={styles.heroTitle}>Terms & Conditions</h1>
                    <p className={styles.heroSub}>The legal stuff — written in plain English, because jargon is boring.</p>
                </div>
            </div>

            <div className="container">
                <div className={styles.page}>
                    <div className={styles.policyContent}>

                        <div className={styles.policyCard}>
                            <h3>👋 Welcome to FUSIC</h3>
                            <p>By using fusic.in (the "Website"), you agree to these Terms and Conditions. FUSIC is owned and operated by FUSIC Fashion Pvt. Ltd., registered in Bhubaneswar, Odisha, India.</p>
                            <p>If you don't agree with any part of these terms, please don't use our website. But we hope you stay — we've got great tees! 😄</p>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>🛒 Ordering & Payments</h3>
                            <ul>
                                <li>All prices on the Website are in Indian Rupees (₹) and inclusive of GST.</li>
                                <li>Placing an order constitutes an offer to purchase. We reserve the right to reject or cancel orders due to stock availability, pricing errors, or suspicious activity.</li>
                                <li>Payment methods include UPI, Credit/Debit Cards, Net Banking, Wallets, EMI, BNPL, and Cash on Delivery (COD) with an additional ₹40 handling fee.</li>
                                <li>EMI options are available on orders above ₹999 through our payment partner Razorpay.</li>
                                <li>All payment processing is handled by Razorpay — a PCI DSS compliant, RBI-licensed payment gateway.</li>
                            </ul>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>📦 Products & Descriptions</h3>
                            <ul>
                                <li>We make every effort to display product colors and details accurately. However, actual colors may vary slightly due to monitor settings and photography lighting.</li>
                                <li>Product sizes follow our Size Guide — please measure before ordering. We offer free size exchanges if you get it wrong!</li>
                                <li>All designs, graphics, and artwork on FUSIC products are original creations or licensed works. They are protected by copyright law.</li>
                            </ul>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>🔐 User Accounts</h3>
                            <ul>
                                <li>You're responsible for maintaining the confidentiality of your account credentials.</li>
                                <li>You must provide accurate and current information when creating an account.</li>
                                <li>We reserve the right to suspend or terminate accounts involved in fraudulent or abusive activity.</li>
                                <li>Guest checkout is available — no account required for one-time purchases.</li>
                            </ul>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>🎨 Intellectual Property</h3>
                            <p>All content on fusic.in — including but not limited to logos, designs, text, graphics, images, and software — is the property of FUSIC Fashion Pvt. Ltd. and protected under Indian Copyright Act, 1957.</p>
                            <div className={styles.policyHighlight}>
                                <p>⚠️ Unauthorized reproduction, distribution, or modification of our designs is strictly prohibited and may result in legal action.</p>
                            </div>
                            <p>Our artisan-created designs are born from real talent and hard work. Respecting this creativity helps support the artisan community.</p>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>📝 User-Generated Content</h3>
                            <ul>
                                <li>By submitting reviews, photos, or comments on our platform, you grant FUSIC a non-exclusive license to use this content for marketing purposes.</li>
                                <li>We reserve the right to remove content that is offensive, misleading, or violates any laws.</li>
                                <li>You retain ownership of your content — we just get to showcase it (with credit, of course!).</li>
                            </ul>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>⚖️ Limitation of Liability</h3>
                            <ul>
                                <li>FUSIC shall not be liable for any indirect, incidental, or consequential damages arising from the use of our Website or products.</li>
                                <li>Our total liability for any claim shall not exceed the amount you paid for the relevant order.</li>
                                <li>We're not liable for delays or failures caused by events beyond our reasonable control (force majeure).</li>
                            </ul>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>🇮🇳 Governing Law</h3>
                            <p>These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Bhubaneswar, Odisha.</p>
                        </div>

                        <div className={styles.policyCard}>
                            <h3>📞 Contact Us</h3>
                            <p>For any questions about these Terms, please reach out:</p>
                            <ul>
                                <li><strong>Email:</strong> legal@fusic.in</li>
                                <li><strong>WhatsApp:</strong> +91 98765 43210</li>
                                <li><strong>Office:</strong> FUSIC HQ, Innovation Hub, Bhubaneswar, Odisha 751024</li>
                            </ul>
                        </div>

                        <p className={styles.lastUpdated}>Last updated: February 2026 · FUSIC Fashion Pvt. Ltd. · CIN: U18100OR2026PTC000000</p>
                    </div>
                </div>
            </div>
        </>
    );
}
