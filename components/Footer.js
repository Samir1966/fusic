import Link from 'next/link';
import styles from './Footer.module.css';

const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Track Order', href: '/track' },
];

const policies = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Return Policy', href: '/returns' },
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Terms & Conditions', href: '/terms' },
];

const socials = [
    { name: 'Instagram', icon: '📸', href: '#' },
    { name: 'YouTube', icon: '▶️', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'WhatsApp', icon: '💬', href: 'https://whatsapp.com/channel/0029Vb7SPnTL7UVcbJccAL1M' },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {/* Newsletter */}
            <div className={styles.newsletter}>
                <div className="container">
                    <div className={styles.newsletterInner}>
                        <div className={styles.newsletterText}>
                            <h3>Join the FUSIC Crew 🔥</h3>
                            <p>Get exclusive drops, festival deals & ₹200 off your first order!</p>
                        </div>
                        <div className={styles.newsletterForm}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    placeholder="Your email or phone number"
                                    className={styles.emailInput}
                                />
                                <button className="btn btn-primary">Subscribe</button>
                            </div>
                            <p className={styles.smsNote}>📱 We also send deals via SMS & WhatsApp</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className={styles.footerMain}>
                <div className="container">
                    <div className={styles.footerGrid}>
                        {/* Brand */}
                        <div className={styles.footerBrand}>
                            <div className={styles.footerLogo}>FUSIC</div>
                            <p className={styles.footerDesc}>
                                Where music meets fashion. Bold, youthful, and unapologetically Indian.
                                Street-ethnic fusion for the culture. 🎵
                            </p>
                            <div className={styles.socials}>
                                {socials.map((s, i) => (
                                    <a key={i} href={s.href} className={styles.socialLink} aria-label={s.name}>
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className={styles.footerCol}>
                            <h4>Quick Links</h4>
                            {quickLinks.map((link, i) => (
                                <Link key={i} href={link.href}>{link.label}</Link>
                            ))}
                        </div>

                        {/* Policies */}
                        <div className={styles.footerCol}>
                            <h4>Policies</h4>
                            {policies.map((link, i) => (
                                <Link key={i} href={link.href}>{link.label}</Link>
                            ))}
                        </div>

                        {/* Contact */}
                        <div className={styles.footerCol}>
                            <h4>Get In Touch</h4>
                            <a href="mailto:hello@fusic.store">📧 hello@fusic.store</a>
                            <a href="tel:+917077991009">📞 +91 70779 91009</a>
                            <a href="https://whatsapp.com/channel/0029Vb7SPnTL7UVcbJccAL1M">💬 WhatsApp Us</a>
                            <div className={styles.appCta}>
                                <p>📱 Download FUSIC App</p>
                                <div className={styles.storeButtons}>
                                    <button className={styles.storeBtn}>App Store</button>
                                    <button className={styles.storeBtn}>Play Store</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment + Bottom */}
                    <div className={styles.footerBottom}>
                        <div className={styles.paymentIcons}>
                            <span className={styles.payIcon}>UPI</span>
                            <span className={styles.payIcon}>VISA</span>
                            <span className={styles.payIcon}>MC</span>
                            <span className={styles.payIcon}>COD</span>
                            <span className={styles.payIcon}>Paytm</span>
                            <span className={styles.payIcon}>GPay</span>
                        </div>
                        <p className={styles.copyright}>
                            © 2026 FUSIC. All rights reserved. Made with 🧡 in India.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
