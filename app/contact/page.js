'use client';
import { useState } from 'react';
import styles from '../info.module.css';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <>
            {/* Hero */}
            <div className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroOverlay} style={{ background: 'linear-gradient(135deg, #10B981 0%, #3F37C9 50%, #1a1a1a 100%)' }}></div>
                </div>
                <div className={`container ${styles.heroContent}`}>
                    <span className={styles.heroEmoji}>💬</span>
                    <h1 className={styles.heroTitle}>Get In Touch</h1>
                    <p className={styles.heroSub}>
                        We're humans, not bots. Reach out and we'll respond within 4 hours (usually faster)!
                    </p>
                </div>
            </div>

            <div className="container">
                <div className={styles.page}>
                    <div className={styles.contactGrid}>
                        {/* Form */}
                        <div>
                            <h2 className={styles.sectionTitle}>✍️ Drop Us a Message</h2>
                            <form className={styles.contactForm} onSubmit={handleSubmit}>
                                <div className={styles.formRow}>
                                    <div className={styles.inputGroup}>
                                        <label>Full Name *</label>
                                        <input type="text" placeholder="Your name" required value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Phone *</label>
                                        <input type="tel" placeholder="+91 70779 91009" required value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                                    </div>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Email *</label>
                                    <input type="email" placeholder="your@email.com" required value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Subject</label>
                                    <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                                        <option value="">Choose a topic...</option>
                                        <option>Order Issue</option>
                                        <option>Return/Exchange</option>
                                        <option>Size Help</option>
                                        <option>Bulk/Corporate Orders</option>
                                        <option>Collaboration</option>
                                        <option>Feedback/Suggestion</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Message *</label>
                                    <textarea placeholder="Tell us everything..." required value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                    {sent ? '✅ Message Sent!' : 'Send Message →'}
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className={styles.contactInfo}>
                            <h2 className={styles.sectionTitle}>📍 Other Ways</h2>

                            <div className={styles.contactCard}>
                                <div className={styles.contactCardIcon} style={{ background: 'rgba(37,211,102,0.1)' }}>💬</div>
                                <div>
                                    <p className={styles.contactCardTitle}>WhatsApp (Fastest!)</p>
                                    <p className={styles.contactCardText}>+91 70779 91009</p>
                                    <p className={styles.contactCardText}>Avg. response: 15 minutes</p>
                                </div>
                            </div>

                            <div className={styles.contactCard}>
                                <div className={styles.contactCardIcon} style={{ background: 'rgba(255,107,53,0.1)' }}>📧</div>
                                <div>
                                    <p className={styles.contactCardTitle}>Email</p>
                                    <p className={styles.contactCardText}>hello@fusic.store</p>
                                    <p className={styles.contactCardText}>Avg. response: 4 hours</p>
                                </div>
                            </div>

                            <div className={styles.contactCard}>
                                <div className={styles.contactCardIcon} style={{ background: 'rgba(63,55,201,0.1)' }}>📞</div>
                                <div>
                                    <p className={styles.contactCardTitle}>Phone</p>
                                    <p className={styles.contactCardText}>+91 70779 91009</p>
                                    <p className={styles.contactCardText}>Mon–Sat, 10 AM – 7 PM IST</p>
                                </div>
                            </div>

                            <div className={styles.contactCard}>
                                <div className={styles.contactCardIcon} style={{ background: 'rgba(212,168,83,0.1)' }}>📸</div>
                                <div>
                                    <p className={styles.contactCardTitle}>Social Media</p>
                                    <p className={styles.contactCardText}>@fusic.store on Instagram</p>
                                    <p className={styles.contactCardText}>DMs open 24/7</p>
                                </div>
                            </div>

                            <div className={styles.contactCard} style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.05) 0%, rgba(63,55,201,0.05) 100%)', border: '1px solid rgba(255,107,53,0.15)' }}>
                                <div className={styles.contactCardIcon} style={{ background: 'rgba(255,64,87,0.1)' }}>🏢</div>
                                <div>
                                    <p className={styles.contactCardTitle}>Office (Visit Us!)</p>
                                    <p className={styles.contactCardText}>FUSIC Store</p>
                                    <p className={styles.contactCardText}>Pattamundai, Kendrapara, Odisha 754215</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
