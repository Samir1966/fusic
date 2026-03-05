'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css';

export default function CustomerLoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        // Check if already logged in
        fetch('/api/auth/customer')
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    router.push('/account'); // Redirect to dashboard if logged in
                }
            });
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const payload = isLogin
            ? { action: 'login', email, password }
            : { action: 'signup', email, password, name, phone };

        try {
            const res = await fetch('/api/auth/customer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Success! Redirect directly to their account dashboard
                router.push('/account');
                router.refresh();
            } else {
                setError(data.error || 'Authentication failed. Please try again.');
            }
        } catch (err) {
            console.error('Auth error:', err);
            setError('Something went wrong. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className={styles.authCard}>

                <div className={styles.tabs}>
                    <button
                        className={isLogin ? styles.activeTab : styles.tab}
                        onClick={() => { setIsLogin(true); setError(''); }}
                    >
                        Sign In
                    </button>
                    <button
                        className={!isLogin ? styles.activeTab : styles.tab}
                        onClick={() => { setIsLogin(false); setError(''); }}
                    >
                        Create Account
                    </button>
                </div>

                <div className={styles.formContainer}>
                    <h2 className={styles.title}>
                        {isLogin ? 'Welcome back to FUSIC' : 'Join the FUSIC Fam'}
                    </h2>

                    {error && <div className={styles.errorBanner}>{error}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {!isLogin && (
                            <>
                                <div className={styles.inputGroup}>
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required={!isLogin}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Phone Number (Optional)</label>
                                    <input
                                        type="tel"
                                        placeholder="10-digit number"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                    />
                                </div>
                            </>
                        )}

                        <div className={styles.inputGroup}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label>Password</label>
                                {isLogin && <a href="#" className={styles.forgotLink}>Forgot?</a>}
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                            {!isLogin && <span className={styles.hint}>Must be at least 6 characters.</span>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            style={{ width: '100%', marginTop: '1rem' }}
                            disabled={loading}
                        >
                            {loading
                                ? 'Processing...'
                                : isLogin ? 'Sign In →' : 'Create Account →'}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}
