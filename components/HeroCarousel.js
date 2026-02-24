'use client';
import { useState, useEffect, useCallback } from 'react';
import { heroSlides } from '@/data/products';
import Link from 'next/link';
import styles from './HeroCarousel.module.css';

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goTo = useCallback((index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrent(index);
        setTimeout(() => setIsTransitioning(false), 600);
    }, [isTransitioning]);

    const next = useCallback(() => {
        goTo((current + 1) % heroSlides.length);
    }, [current, goTo]);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const slide = heroSlides[current];

    return (
        <section className={styles.hero}>
            <div
                className={styles.heroSlide}
                key={current}
                style={{ background: slide.gradient }}
            >
                {/* Decorative elements */}
                <div className={styles.floatingCircle1}></div>
                <div className={styles.floatingCircle2}></div>
                <div className={styles.floatingCircle3}></div>
                <div className={styles.gridPattern}></div>

                <div className={`container ${styles.heroContent}`}>
                    <div className={styles.heroLeft}>
                        <div className={styles.badge}>{slide.badge}</div>
                        <h1 className={styles.heroTitle}>{slide.title}</h1>
                        <p className={styles.heroSubtitle}>{slide.subtitle}</p>
                        <p className={styles.heroDesc}>{slide.description}</p>
                        <div className={styles.heroCtas}>
                            <Link href="/shop?category=men" className="btn btn-primary btn-lg">
                                Shop Men →
                            </Link>
                            <Link href="/shop?category=women" className="btn btn-white btn-lg">
                                Shop Women
                            </Link>
                            <Link href="/design" className="btn btn-outline btn-lg" style={{ borderColor: '#fff', color: '#fff' }}>
                                Design Your Tee 🎨
                            </Link>
                        </div>
                        <div className={styles.heroStats}>
                            <div className={styles.stat}>
                                <span className={styles.statNum}>50K+</span>
                                <span className={styles.statLabel}>Happy Customers</span>
                            </div>
                            <div className={styles.statDivider}></div>
                            <div className={styles.stat}>
                                <span className={styles.statNum}>4.8★</span>
                                <span className={styles.statLabel}>Average Rating</span>
                            </div>
                            <div className={styles.statDivider}></div>
                            <div className={styles.stat}>
                                <span className={styles.statNum}>500+</span>
                                <span className={styles.statLabel}>Designs</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.heroRight}>
                        <img
                            src={slide.imageUrl}
                            alt={slide.title}
                            className={styles.heroImage}
                        />
                    </div>
                </div>
            </div>

            {/* Dots */}
            <div className={styles.dots}>
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                        onClick={() => goTo(i)}
                        aria-label={`Slide ${i + 1}`}
                    >
                        <span className={styles.dotProgress} style={{
                            animationDuration: i === current ? '5s' : '0s',
                            animationPlayState: i === current ? 'running' : 'paused',
                        }}></span>
                    </button>
                ))}
            </div>
        </section>
    );
}
