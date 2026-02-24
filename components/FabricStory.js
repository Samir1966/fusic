import styles from './FabricStory.module.css';

const qualities = [
    { icon: '🧵', title: '100% Premium Cotton', desc: 'Ring-spun combed cotton for buttery softness' },
    { icon: '🎨', title: 'Fade-Proof Prints', desc: 'DTG + screen printing that survives 100+ washes' },
    { icon: '🌿', title: 'Eco-Friendly Dyes', desc: 'OEKO-TEX certified, safe for skin & planet' },
    { icon: '📏', title: '240 GSM Heavy', desc: 'Thick, structured fabric that drapes perfectly' },
];

export default function FabricStory() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.layout}>
                    <div className={styles.left}>
                        <span className={styles.eyebrow}>Our Promise</span>
                        <h2 className={`section-title ${styles.title}`}>
                            Built Different. <br />Worn Proud.
                        </h2>
                        <p className={styles.desc}>
                            Every FUSIC piece is crafted with intention. From our 240 GSM heavy cotton to
                            fade-proof prints that survive seasons — we obsess over quality so you don&apos;t
                            have to compromise between style and durability.
                        </p>
                        <div className={styles.qualities}>
                            {qualities.map((q, i) => (
                                <div key={i} className={styles.quality}>
                                    <span className={styles.qualityIcon}>{q.icon}</span>
                                    <div>
                                        <h4>{q.title}</h4>
                                        <p>{q.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.fabricVisual}>
                            <div className={styles.fabricCircle}>
                                <span>🧶</span>
                            </div>
                            <div className={styles.fabricLabel}>
                                <h4>Premium Cotton</h4>
                                <p>Sourced from Gujarat</p>
                            </div>
                        </div>
                        <div className={styles.sustainBadge}>
                            <span>🌱</span>
                            <div>
                                <h4>Sustainability First</h4>
                                <p>We&apos;ve saved 10,000 liters of water this year through eco-friendly processes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
