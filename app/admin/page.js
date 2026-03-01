'use client';
import { useState, useEffect } from 'react';
import styles from './admin.module.css';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/analytics')
            .then((res) => res.json())
            .then((data) => {
                setStats(data.stats);
                setRecentOrders(data.recentOrders || []);
                setTopProducts(data.topProducts || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className={styles.pageLoading}>Loading dashboard...</div>;

    const statCards = [
        { label: 'Total Revenue', value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`, icon: '💰', color: '#10B981' },
        { label: 'Total Orders', value: stats?.totalOrders || 0, icon: '📦', color: '#3F37C9' },
        { label: 'Customers', value: stats?.totalCustomers || 0, icon: '👥', color: '#FF6B35' },
        { label: 'Products', value: stats?.totalProducts || 0, icon: '👕', color: '#FF4057' },
        { label: 'Pending Orders', value: stats?.pendingOrders || 0, icon: '⏳', color: '#D4A853' },
        { label: 'Avg. Order Value', value: `₹${stats?.avgOrderValue || 0}`, icon: '📈', color: '#7B73F0' },
    ];

    const statusColors = {
        pending: '#D4A853',
        confirmed: '#3F37C9',
        shipped: '#7B73F0',
        delivered: '#10B981',
        cancelled: '#FF4057',
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Dashboard</h1>
                <p className={styles.pageSubtitle}>Welcome back, Satya! Here&apos;s your store overview.</p>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                {statCards.map((card, i) => (
                    <div key={i} className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: `${card.color}15`, color: card.color }}>
                            {card.icon}
                        </div>
                        <div>
                            <p className={styles.statValue}>{card.value}</p>
                            <p className={styles.statLabel}>{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.dashboardGrid}>
                {/* Recent Orders */}
                <div className={styles.dashCard}>
                    <h3 className={styles.dashCardTitle}>📦 Recent Orders</h3>
                    {recentOrders.length === 0 ? (
                        <p className={styles.emptyText}>No orders yet. They&apos;ll show up here!</p>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td className={styles.mono}>{order.order_number}</td>
                                        <td>{order.customer_name}</td>
                                        <td>₹{parseFloat(order.total).toLocaleString()}</td>
                                        <td>
                                            <span
                                                className={styles.badge}
                                                style={{ background: `${statusColors[order.order_status]}20`, color: statusColors[order.order_status] }}
                                            >
                                                {order.order_status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Top Products */}
                <div className={styles.dashCard}>
                    <h3 className={styles.dashCardTitle}>🔥 Top Products</h3>
                    {topProducts.length === 0 ? (
                        <p className={styles.emptyText}>Product stats will appear after orders.</p>
                    ) : (
                        <div className={styles.topList}>
                            {topProducts.map((p, i) => (
                                <div key={i} className={styles.topItem}>
                                    <span className={styles.topRank}>#{i + 1}</span>
                                    <div className={styles.topInfo}>
                                        <p className={styles.topName}>{p.name}</p>
                                        <p className={styles.topMeta}>{p.sold} sold · ₹{p.revenue.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
