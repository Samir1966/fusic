'use client';
import { useState } from 'react';
import styles from '../info.module.css';

const faqs = [
    {
        category: '🛒 Orders & Delivery',
        items: [
            { q: 'How long does delivery take?', a: 'Standard delivery takes 4-7 business days for most locations across India. Metro cities (Delhi, Mumbai, Kolkata, Bengaluru, Chennai, Hyderabad) receive orders in 3-5 days. For remote/rural areas, it may take up to 10 days. We\'ll send you real-time tracking via WhatsApp!' },
            { q: 'Do you offer Cash on Delivery (COD)?', a: 'Yes! COD is available on all orders across India. A small ₹40 COD handling fee applies. For prepaid orders (UPI/card), you save this fee plus get priority dispatch!' },
            { q: 'Can I change my order after placing it?', a: 'You can modify your order within 1 hour of placing it by contacting us on WhatsApp. After that, the order enters processing and changes may not be possible.' },
            { q: 'Do you ship internationally?', a: 'Currently we ship only within India. International shipping is coming soon — join our newsletter to be the first to know!' },
        ],
    },
    {
        category: '↩️ Returns & Exchanges',
        items: [
            { q: 'What is your return policy?', a: 'We offer 7-day easy returns on all products. If you\'re not happy with your purchase, initiate a return from your account or WhatsApp us. We\'ll arrange a free pickup from your doorstep.' },
            { q: 'Can I exchange for a different size?', a: 'Absolutely! Size exchanges are free and easy. WhatsApp us within 7 days of delivery with your order number and preferred size. We\'ll ship the new size before picking up the old one.' },
            { q: 'How long do refunds take?', a: 'Refunds are processed within 3-5 business days after we receive the returned item. For UPI/card payments, it reflects in 5-7 days. For COD orders, refund is via bank transfer or store credit (your choice!).' },
        ],
    },
    {
        category: '👕 Products & Sizing',
        items: [
            { q: 'What fabric do you use?', a: 'We use 100% combed cotton (180-240 GSM) for our tees, and 60/40 cotton-polyester fleece (380 GSM) for hoodies. All fabrics are pre-shrunk and bio-washed for a soft, premium feel that lasts 100+ washes.' },
            { q: 'How do I find my perfect size?', a: 'Check our detailed Size Guide page! We provide exact measurements in both inches and cm. Pro tip: Our oversized tees are designed to fit loose — if you want a snug oversized look, go with your regular size. For a truly baggy fit, go one size up.' },
            { q: 'Are your prints durable?', a: 'Yes! We use DTG (Direct to Garment) and screen printing techniques that are rated for 100+ washes without fading or cracking. We test each design rigorously before production.' },
            { q: 'Do you offer custom/bulk orders?', a: 'Yes! For college fests, corporate events, or custom group orders (minimum 25 pieces), contact us at hello@fusic.in or WhatsApp. We offer special bulk pricing and can print your custom designs!' },
        ],
    },
    {
        category: '💳 Payments',
        items: [
            { q: 'What payment methods do you accept?', a: 'UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, Wallets (Paytm, Amazon Pay), Buy Now Pay Later (Simpl, LazyPay), EMI (for orders ₹999+), and Cash on Delivery.' },
            { q: 'Is there an EMI option?', a: 'Yes! For orders ₹999 and above, you can split your payment into 3, 6, or 9 easy monthly installments at no extra cost. Select "EMI (No-Cost)" at checkout.' },
            { q: 'Is my payment secure?', a: 'Absolutely. We use Razorpay for payment processing — India\'s most trusted payment gateway. All transactions are 256-bit SSL encrypted and PCI DSS compliant. Your card details are never stored on our servers.' },
        ],
    },
];

export default function FAQPage() {
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (key) => {
        setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            {/* Hero */}
            <div className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroOverlay} style={{ background: 'linear-gradient(135deg, #FF4057 0%, #FF6B35 50%, #FFD93D 100%)' }}></div>
                </div>
                <div className={`container ${styles.heroContent}`}>
                    <span className={styles.heroEmoji}>❓</span>
                    <h1 className={styles.heroTitle}>FAQs</h1>
                    <p className={styles.heroSub}>
                        Got questions? We've got answers. If you can't find what you need, WhatsApp us!
                    </p>
                </div>
            </div>

            <div className="container">
                <div className={styles.page}>
                    {faqs.map((category, ci) => (
                        <div key={ci} className={styles.section}>
                            <h2 className={styles.sectionTitle}>{category.category}</h2>
                            <div className={styles.faqList}>
                                {category.items.map((item, ii) => {
                                    const key = `${ci}-${ii}`;
                                    const isOpen = openItems[key];
                                    return (
                                        <div key={ii} className={styles.faqItem}>
                                            <button className={styles.faqQ} onClick={() => toggleItem(key)}>
                                                <span>{item.q}</span>
                                                <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ''}`}>+</span>
                                            </button>
                                            {isOpen && <div className={styles.faqA}>{item.a}</div>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Still need help? */}
                    <div className={styles.policyCard} style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,107,53,0.05) 0%, rgba(63,55,201,0.05) 100%)' }}>
                        <h3 style={{ justifyContent: 'center' }}>🤔 Still Have Questions?</h3>
                        <p>We're just a WhatsApp message away. Our team typically replies within 15 minutes!</p>
                        <a href="https://wa.me/919876543210" className="btn btn-primary btn-lg" style={{ marginTop: '12px' }}>
                            💬 Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
