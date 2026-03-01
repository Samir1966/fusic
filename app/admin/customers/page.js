'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AdminCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/customers?search=${search}`)
            .then((r) => r.json())
            .then((data) => {
                setCustomers(data.customers || []);
                setTotal(data.total || 0);
                setLoading(false);
            });
    }, [search]);

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Customers</h1>
                    <p className={styles.pageSubtitle}>{total} registered customers</p>
                </div>
            </div>

            <div className={styles.toolbar}>
                <input
                    type="text" placeholder="Search by name, phone, or email..."
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            {loading ? <p className={styles.pageLoading}>Loading...</p> : (
                <div className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th><th>Phone</th><th>Email</th><th>City</th>
                                <th>Orders</th><th>Total Spent</th><th>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length === 0 ? (
                                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px' }}>No customers yet. They'll appear when orders are placed.</td></tr>
                            ) : (
                                customers.map((c) => (
                                    <tr key={c.id}>
                                        <td><strong>{c.name}</strong></td>
                                        <td>{c.phone}</td>
                                        <td>{c.email || '—'}</td>
                                        <td>{c.city || '—'}</td>
                                        <td>{c.total_orders || 0}</td>
                                        <td>₹{(c.total_spent || 0).toLocaleString()}</td>
                                        <td>{new Date(c.created_at).toLocaleDateString('en-IN')}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
