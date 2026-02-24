import styles from '../info.module.css';

const menSizes = [
    { size: 'S', chest: '36"', length: '26"', shoulder: '17"', sleeve: '8"' },
    { size: 'M', chest: '38"', length: '27"', shoulder: '18"', sleeve: '8.5"' },
    { size: 'L', chest: '40"', length: '28"', shoulder: '19"', sleeve: '9"' },
    { size: 'XL', chest: '42"', length: '29"', shoulder: '20"', sleeve: '9.5"' },
    { size: 'XXL', chest: '44"', length: '30"', shoulder: '21"', sleeve: '10"' },
];

const womenSizes = [
    { size: 'XS', chest: '32"', length: '23"', shoulder: '14.5"', sleeve: '7"' },
    { size: 'S', chest: '34"', length: '24"', shoulder: '15"', sleeve: '7.5"' },
    { size: 'M', chest: '36"', length: '25"', shoulder: '15.5"', sleeve: '8"' },
    { size: 'L', chest: '38"', length: '26"', shoulder: '16"', sleeve: '8.5"' },
    { size: 'XL', chest: '40"', length: '27"', shoulder: '17"', sleeve: '9"' },
];

const oversizedSizes = [
    { size: 'S', chest: '40"', length: '28"', shoulder: '21"', sleeve: '9"' },
    { size: 'M', chest: '42"', length: '29"', shoulder: '22"', sleeve: '9.5"' },
    { size: 'L', chest: '44"', length: '30"', shoulder: '23"', sleeve: '10"' },
    { size: 'XL', chest: '46"', length: '31"', shoulder: '24"', sleeve: '10.5"' },
    { size: 'XXL', chest: '48"', length: '32"', shoulder: '25"', sleeve: '11"' },
];

const hoodieSizes = [
    { size: 'S', chest: '40"', length: '26"', shoulder: '19"', sleeve: '23"' },
    { size: 'M', chest: '42"', length: '27"', shoulder: '20"', sleeve: '24"' },
    { size: 'L', chest: '44"', length: '28"', shoulder: '21"', sleeve: '25"' },
    { size: 'XL', chest: '46"', length: '29"', shoulder: '22"', sleeve: '26"' },
    { size: 'XXL', chest: '48"', length: '30"', shoulder: '23"', sleeve: '27"' },
];

function SizeTable({ title, emoji, sizes, color }) {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <h3 className={styles.sectionTitle} style={{ fontSize: '1.3rem' }}>{emoji} {title}</h3>
            <table className={styles.sizeTable}>
                <thead>
                    <tr style={{ background: color }}>
                        <th>Size</th>
                        <th>Chest</th>
                        <th>Length</th>
                        <th>Shoulder</th>
                        <th>Sleeve</th>
                    </tr>
                </thead>
                <tbody>
                    {sizes.map((row, i) => (
                        <tr key={i}>
                            <td style={{ fontWeight: 700 }}>{row.size}</td>
                            <td>{row.chest}</td>
                            <td>{row.length}</td>
                            <td>{row.shoulder}</td>
                            <td>{row.sleeve}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function SizeGuidePage() {
    return (
        <>
            {/* Hero */}
            <div className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.heroOverlay} style={{ background: 'linear-gradient(135deg, #D4A853 0%, #FF6B35 50%, #FF4057 100%)' }}></div>
                </div>
                <div className={`container ${styles.heroContent}`}>
                    <span className={styles.heroEmoji}>📏</span>
                    <h1 className={styles.heroTitle}>Size Guide</h1>
                    <p className={styles.heroSub}>
                        Find your perfect fit. All measurements are in inches and taken flat across.
                    </p>
                </div>
            </div>

            <div className="container">
                <div className={styles.page}>
                    {/* How to Measure */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>📐 How to Measure</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                            <div className={styles.sizeTip}>
                                <span className={styles.sizeTipIcon}>📏</span>
                                <div className={styles.sizeTipText}>
                                    <strong>Chest:</strong> Measure under the arms, around the fullest part of the chest.
                                </div>
                            </div>
                            <div className={styles.sizeTip}>
                                <span className={styles.sizeTipIcon}>📐</span>
                                <div className={styles.sizeTipText}>
                                    <strong>Length:</strong> Measure from the highest point of the shoulder to the bottom hem.
                                </div>
                            </div>
                            <div className={styles.sizeTip}>
                                <span className={styles.sizeTipIcon}>↔️</span>
                                <div className={styles.sizeTipText}>
                                    <strong>Shoulder:</strong> Measure from one shoulder seam to the other, across the back.
                                </div>
                            </div>
                            <div className={styles.sizeTip}>
                                <span className={styles.sizeTipIcon}>💪</span>
                                <div className={styles.sizeTipText}>
                                    <strong>Sleeve:</strong> Measure from the shoulder seam to the end of the sleeve.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Size Tables */}
                    <SizeTable title="Men's Regular Fit" emoji="👔" sizes={menSizes} color="#1a1a1a" />
                    <SizeTable title="Women's Regular Fit" emoji="👗" sizes={womenSizes} color="#FF4057" />
                    <SizeTable title="Oversized Fit (Unisex)" emoji="🎒" sizes={oversizedSizes} color="#3F37C9" />
                    <SizeTable title="Hoodies (Unisex)" emoji="🧥" sizes={hoodieSizes} color="#10B981" />

                    {/* Pro Tips */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>💡 Pro Tips</h2>
                        <div className={styles.valuesGrid}>
                            <div className={styles.valueCard} style={{ borderColor: '#FF6B35' }}>
                                <div className={styles.valueEmoji}>🎯</div>
                                <h3 className={styles.valueTitle}>Between Sizes?</h3>
                                <p className={styles.valueDesc}>Always go one size up. Our cotton shrinks very slightly (1-2%) after the first wash, so sizing up gives you the perfect fit after washing.</p>
                            </div>
                            <div className={styles.valueCard} style={{ borderColor: '#3F37C9' }}>
                                <div className={styles.valueEmoji}>🏋️</div>
                                <h3 className={styles.valueTitle}>Oversized Fit</h3>
                                <p className={styles.valueDesc}>Want the trendy oversized look? Go with your regular size in our Oversized collection — they're already cut bigger. For extra baggy, go one up.</p>
                            </div>
                            <div className={styles.valueCard} style={{ borderColor: '#10B981' }}>
                                <div className={styles.valueEmoji}>🔄</div>
                                <h3 className={styles.valueTitle}>Free Size Exchange</h3>
                                <p className={styles.valueDesc}>Wrong size? No worries! We offer free size exchanges within 7 days. WhatsApp us and we'll sort it out — no questions asked.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
