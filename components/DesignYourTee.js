'use client';
import { useState } from 'react';
import styles from './DesignYourTee.module.css';

const mockDesigns = [
    { id: 1, title: 'Mandala Drift', artist: 'Priya M.', city: 'Bhubaneswar', votes: 342, emoji: '🎨' },
    { id: 2, title: 'Neon Chai', artist: 'Arjun K.', city: 'Ranchi', votes: 289, emoji: '☕' },
    { id: 3, title: 'Temple Bass', artist: 'Sneha R.', city: 'Patna', votes: 256, emoji: '🎵' },
    { id: 4, title: 'Desi Pixel', artist: 'Rahul S.', city: 'Siliguri', votes: 198, emoji: '👾' },
    { id: 5, title: 'Kolkata Vibes', artist: 'Meera D.', city: 'Cuttack', votes: 176, emoji: '🌇' },
];

export default function DesignYourTee() {
    const [voted, setVoted] = useState({});

    const handleVote = (id) => {
        setVoted(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <div>
                        <h2 className="section-title">
                            Design Your Tee 🎨
                        </h2>
                        <p className="section-subtitle">
                            Upload your art. Community votes. Winner gets produced + royalty!
                        </p>
                    </div>
                    <button className="btn btn-primary btn-lg">
                        Upload Your Design ↑
                    </button>
                </div>

                {/* How it works */}
                <div className={styles.howItWorks}>
                    <div className={styles.step}>
                        <span className={styles.stepNum}>01</span>
                        <h4>Upload</h4>
                        <p>Share your artwork or text design</p>
                    </div>
                    <div className={styles.stepArrow}>→</div>
                    <div className={styles.step}>
                        <span className={styles.stepNum}>02</span>
                        <h4>Vote</h4>
                        <p>Community picks the best designs</p>
                    </div>
                    <div className={styles.stepArrow}>→</div>
                    <div className={styles.step}>
                        <span className={styles.stepNum}>03</span>
                        <h4>Produce</h4>
                        <p>Monthly winner gets manufactured</p>
                    </div>
                    <div className={styles.stepArrow}>→</div>
                    <div className={styles.step}>
                        <span className={styles.stepNum}>04</span>
                        <h4>Earn</h4>
                        <p>Free merch + royalty per sale</p>
                    </div>
                </div>

                {/* Leaderboard */}
                <div className={styles.leaderboard}>
                    <h3 className={styles.leaderTitle}>🏆 Community Leaderboard — This Month</h3>
                    <div className={styles.designs}>
                        {mockDesigns.map((design, i) => (
                            <div key={design.id} className={styles.designCard}>
                                <div className={styles.rank}>#{i + 1}</div>
                                <div className={styles.designPreview}>
                                    <span className={styles.designEmoji}>{design.emoji}</span>
                                </div>
                                <div className={styles.designInfo}>
                                    <h4>{design.title}</h4>
                                    <p>by {design.artist} • {design.city}</p>
                                </div>
                                <div className={styles.voteArea}>
                                    <button
                                        className={`${styles.voteBtn} ${voted[design.id] ? styles.voted : ''}`}
                                        onClick={() => handleVote(design.id)}
                                    >
                                        {voted[design.id] ? '❤️' : '🤍'} {design.votes + (voted[design.id] ? 1 : 0)}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
