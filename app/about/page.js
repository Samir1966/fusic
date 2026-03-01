'use client';
import styles from '../info.module.css';

const timeline = [
    {
        year: 'The Spark ✨',
        title: 'A Hostel Room Dream',
        desc: 'Three friends in a college hostel — frustrated by the lack of affordable, Indian-inspired streetwear. Everyone was copying the West. We asked: Why can\'t desi graphics, fabric stories, and regional art live on world-class tees?',
    },
    {
        year: 'Research 🔍',
        title: 'Talking to 500+ Gen-Z Indians',
        desc: 'We surveyed students in Bhubaneswar, Kolkata, Ranchi and online. The verdict was clear: "We want streetwear that feels Indian, not imported." FUSIC was born — Fusion + Music + Culture.',
    },
    {
        year: 'The First Drop 🎨',
        title: '12 Designs, 1 Instagram Post',
        desc: 'Our first collection was hand-sketched by Soumya — Bollywood retro, temple architecture, street slang in Devanagari. We posted on Instagram and sold out 200 tees in 72 hours. The movement had begun.',
    },
    {
        year: 'Building the Team 🤝',
        title: 'From Trio to Crew',
        desc: 'Madhusmita brought business acumen and an obsession with product quality. Satya built the tech stack from scratch. Soumya created visual worlds that spoke to every corner of India. Together, we became unstoppable.',
    },
    {
        year: 'The Platform 💻',
        title: 'Launching fusic.store',
        desc: 'We built everything in-house — no Shopify templates, no borrowed aesthetics. Every pixel, every interaction designed for the Indian shopper. COD, UPI, WhatsApp order updates, festival drops, EMI for students — India-first, always.',
    },
    {
        year: 'Today 🚀',
        title: 'A Movement, Not Just a Brand',
        desc: 'FUSIC isn\'t just clothing. It\'s a rebellion against boring fashion. Every tee tells a story. Every hoodie carries a culture. We celebrate the artisans, the weavers, the printers who pour their soul into every piece. This is fashion built with love and hardship.',
    },
];

const founders = [
    {
        name: 'MADHUSMITA',
        role: 'CEO — Chief Executive Officer',
        gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF4057 100%)',
        emoji: '👩‍💼',
        color: '#FF6B35',
        quote: '"Fashion should empower, not exclude. Every Indian deserves to feel extraordinary in what they wear."',
    },
    {
        name: 'SATYA',
        role: 'CTO — Chief Technology Officer',
        gradient: 'linear-gradient(135deg, #3F37C9 0%, #7B73F0 100%)',
        emoji: '👨‍💻',
        color: '#3F37C9',
        quote: '"Technology should make shopping effortless — especially for Bharat. We build for the next billion users."',
    },
    {
        name: 'SOUMYA',
        role: 'CDO — Chief Design Officer',
        gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
        emoji: '🎨',
        color: '#10B981',
        quote: '"Every design is a love letter to Indian culture — from temple gopurams to Bollywood retro. This is our art."',
    },
];

const values = [
    {
        emoji: '🧵',
        title: 'Ethical Fashion',
        desc: 'We pay our artisans fairly, use organic cotton where possible, and believe great fashion shouldn\'t cost the earth. No sweatshops, no shortcuts.',
        color: '#FF6B35',
    },
    {
        emoji: '🇮🇳',
        title: 'Unapologetically Indian',
        desc: 'From the graphics we design to the regional languages we support — we celebrate every shade of India. Desi is not lesser, it\'s legendary.',
        color: '#3F37C9',
    },
    {
        emoji: '💪',
        title: 'Built for Bharat',
        desc: 'COD because not everyone has a credit card. EMI because students budget monthly. Kirana pickup because every village deserves fashion delivery.',
        color: '#10B981',
    },
    {
        emoji: '🎭',
        title: 'Culture is the Canvas',
        desc: 'Bollywood, temple art, street slang, folk stories, music, cricket — we turn India\'s kaleidoscope of cultures into wearable art.',
        color: '#D4A853',
    },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <div className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroOverlay} style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #3F37C9 50%, #FF6B35 100%)' }}></div>
                </div>
                <div className={`container ${styles.heroContent}`}>
                    <span className={styles.heroEmoji}>🎸</span>
                    <h1 className={styles.heroTitle}>Our Story</h1>
                    <p className={styles.heroSub}>
                        Born from a hostel-room dream. Built with love, grit, and an obsession with Indian culture.
                    </p>
                </div>
            </div>

            <div className="container">
                <div className={styles.page}>
                    {/* Stats */}
                    <div className={styles.statsStrip}>
                        <div className={styles.statItem}>
                            <div className={styles.statNum}>50K+</div>
                            <div className={styles.statLabel}>Happy Customers</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statNum}>500+</div>
                            <div className={styles.statLabel}>Original Designs</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statNum}>25+</div>
                            <div className={styles.statLabel}>Artisan Partners</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statNum}>4.8★</div>
                            <div className={styles.statLabel}>Average Rating</div>
                        </div>
                    </div>

                    {/* Journey */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>🛤️ The FUSIC Journey</h2>
                        <p className={styles.sectionSub}>
                            From sketching on hostel walls to building India's boldest streetwear brand.
                            Here's how three dreamers turned a frustration into a revolution.
                        </p>
                        <div className={styles.timeline}>
                            {timeline.map((item, i) => (
                                <div key={i} className={styles.timelineItem}>
                                    <div className={styles.timelineDot}>{i + 1}</div>
                                    <div className={styles.timelineYear}>{item.year}</div>
                                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                                    <p className={styles.timelineDesc}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>🔥 Meet the Founders</h2>
                        <p className={styles.sectionSub}>
                            Three visionaries who believe fashion can be ethical, affordable, and unapologetically Indian.
                        </p>
                        <div className={styles.teamGrid}>
                            {founders.map((f, i) => (
                                <div key={i} className={styles.teamCard}>
                                    <div className={styles.teamAvatar} style={{ background: f.gradient }}>
                                        {f.emoji}
                                    </div>
                                    <h3 className={styles.teamName}>{f.name}</h3>
                                    <p className={styles.teamRole} style={{ color: f.color }}>{f.role}</p>
                                    <p className={styles.teamQuote}>{f.quote}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Values */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>💎 What We Stand For</h2>
                        <div className={styles.valuesGrid}>
                            {values.map((v, i) => (
                                <div key={i} className={styles.valueCard} style={{ borderColor: v.color }}>
                                    <div className={styles.valueEmoji}>{v.emoji}</div>
                                    <h3 className={styles.valueTitle}>{v.title}</h3>
                                    <p className={styles.valueDesc}>{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Artisan Love */}
                    <div className={styles.section}>
                        <div className={styles.policyCard} style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.03) 0%, rgba(63,55,201,0.03) 100%)', border: '2px solid rgba(255,107,53,0.1)' }}>
                            <h3>🧡 A Note on Our Artisans</h3>
                            <p>
                                Behind every FUSIC tee is a team of incredible human beings — block printers in Rajasthan,
                                screen printers in Tirupur, embroiderers in Lucknow, and weavers in Odisha. They work with
                                their hands, often in small workshops, pouring their craftsmanship into each piece.
                            </p>
                            <p>
                                We don't just source from them — we partner with them. Fair wages, safe workplaces, and credit
                                on every collection. When you buy FUSIC, you're not just buying a tee — you're supporting a
                                family of artisans who create with love and hardship.
                            </p>
                            <div className={styles.policyHighlight}>
                                <p>🤝 Every purchase supports 25+ artisan families across India. Wear with pride.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
