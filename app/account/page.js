'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './account.module.css';

export default function AccountDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Profile Edit State
    const [profile, setProfile] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        pincode: ''
    });

    useEffect(() => {
        fetchAccountData();
    }, []);

    const fetchAccountData = async () => {
        setLoading(true);
        try {
            // 1. Get Session User
            const res = await fetch('/api/auth/customer');
            const data = await res.json();

            if (!data.user) {
                router.push('/login');
                return;
            }

            setUser(data.user);
            const p = data.user.profile || {};
            setProfile({
                name: p.name || '',
                phone: p.phone || '',
                address: p.address || '',
                city: p.city || '',
                pincode: p.pincode || ''
            });

            // 2. Fetch User's Orders from Supabase using their email
            if (data.user.email) {
                const { data: oData } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('email', data.user.email)
                    .order('created_at', { ascending: false });

                if (oData) setOrders(oData);
            }
        } catch (err) {
            console.error('Failed to load account:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/customer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'logout' })
        });
        router.push('/');
        router.refresh();
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            // Update custom 'customers' table in Supabase
            const { error } = await supabase
                .from('customers')
                .update({
                    name: profile.name,
                    phone: profile.phone,
                    address: profile.address,
                    city: profile.city,
                    pincode: profile.pincode
                })
                .eq('id', user.id);

            if (error) throw error;
            alert('Profile updated successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>Loading account details...</div>;
    if (!user) return null; // Wait for redirect

    return (
        <div className="container" style={{ padding: '2rem 1rem', minHeight: '80vh' }}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>My Account</h1>
                    <p className={styles.subtitle}>Welcome back, {profile.name || user.email.split('@')[0]}</p>
                </div>
                <button onClick={handleLogout} className={styles.logoutBtn}>Sign Out</button>
            </div>

            <div className={styles.dashboardGrid}>
                {/* Orders Section */}
                <div className={styles.card}>
                    <h2>Order History</h2>
                    {orders.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>You haven't placed any orders yet.</p>
                            <Link href="/shop" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className={styles.orderList}>
                            {orders.map(order => (
                                <div key={order.id} className={styles.orderItem}>
                                    <div className={styles.orderHeader}>
                                        <span className={styles.orderNumber}>{order.order_number}</span>
                                        <span className={`${styles.statusBadge} ${styles['status_' + order.status.toLowerCase()]}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className={styles.orderDetails}>
                                        <span>{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        <span>•</span>
                                        <span>{order.items.length} items</span>
                                        <span>•</span>
                                        <strong>₹{order.total_amount}</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Profile Details Section */}
                <div className={styles.card}>
                    <h2>My Details</h2>
                    <p className={styles.emailText}><strong>Email:</strong> {user.email}</p>

                    <form onSubmit={handleSaveProfile} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Full Name</label>
                            <input
                                value={profile.name}
                                onChange={e => setProfile({ ...profile, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Phone Number</label>
                            <input
                                value={profile.phone}
                                onChange={e => setProfile({ ...profile, phone: e.target.value })}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Delivery Address</label>
                            <textarea
                                rows={2}
                                value={profile.address}
                                onChange={e => setProfile({ ...profile, address: e.target.value })}
                                placeholder="House/Flat No., Street, Area"
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className={styles.inputGroup}>
                                <label>City</label>
                                <input
                                    value={profile.city}
                                    onChange={e => setProfile({ ...profile, city: e.target.value })}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Pincode</label>
                                <input
                                    value={profile.pincode}
                                    onChange={e => setProfile({ ...profile, pincode: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving}
                            style={{ marginTop: '1rem', width: '100%' }}
                        >
                            {saving ? 'Saving...' : 'Save Details'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
