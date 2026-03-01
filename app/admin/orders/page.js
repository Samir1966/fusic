'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

const statusOptions = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
const statusColors = {
    pending: '#D4A853', confirmed: '#3F37C9', shipped: '#7B73F0',
    delivered: '#10B981', cancelled: '#FF4057',
};

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [total, setTotal] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);

    const fetchOrders = () => {
        setLoading(true);
        fetch(`/api/orders?status=${filter}`)
            .then((r) => r.json())
            .then((data) => {
                setOrders(data.orders || []);
                setTotal(data.total || 0);
                setLoading(false);
            });
    };

    useEffect(() => { fetchOrders(); }, [filter]);

    const viewOrder = async (order) => {
        const res = await fetch(`/api/orders/${order.id}`);
        const data = await res.json();
        setSelectedOrder(data.order);
        setOrderItems(data.order?.items || []);
    };

    const updateStatus = async (id, newStatus) => {
        await fetch(`/api/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_status: newStatus }),
        });
        fetchOrders();
        if (selectedOrder?.id === id) {
            setSelectedOrder({ ...selectedOrder, order_status: newStatus });
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Orders</h1>
                    <p className={styles.pageSubtitle}>{total} total orders</p>
                </div>
            </div>

            <div className={styles.toolbar}>
                <div className={styles.filterTabs}>
                    {['all', ...statusOptions].map((s) => (
                        <button
                            key={s}
                            className={`${styles.filterTab} ${filter === s ? styles.filterActive : ''}`}
                            onClick={() => setFilter(s)}
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? <p className={styles.pageLoading}>Loading...</p> : (
                <div className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Order #</th><th>Customer</th><th>Phone</th>
                                <th>Total</th><th>Payment</th><th>Status</th><th>Date</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr key={o.id}>
                                    <td className={styles.mono}>{o.order_number}</td>
                                    <td>{o.customer_name}</td>
                                    <td>{o.customer_phone}</td>
                                    <td><strong>₹{parseFloat(o.total).toLocaleString()}</strong></td>
                                    <td>{o.payment_method?.toUpperCase()}</td>
                                    <td>
                                        <select
                                            value={o.order_status}
                                            onChange={(e) => updateStatus(o.id, e.target.value)}
                                            className={styles.statusSelect}
                                            style={{ color: statusColors[o.order_status] }}
                                        >
                                            {statusOptions.map((s) => (
                                                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
                                    <td>
                                        <button className={styles.actionBtn} onClick={() => viewOrder(o)}>👁️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className={styles.modalOverlay} onClick={() => setSelectedOrder(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Order {selectedOrder.order_number}</h2>
                            <button onClick={() => setSelectedOrder(null)} className={styles.closeBtn}>✕</button>
                        </div>
                        <div className={styles.orderDetail}>
                            <div className={styles.orderInfo}>
                                <p><strong>Customer:</strong> {selectedOrder.customer_name}</p>
                                <p><strong>Phone:</strong> {selectedOrder.customer_phone}</p>
                                <p><strong>Email:</strong> {selectedOrder.customer_email || 'N/A'}</p>
                                <p><strong>Address:</strong> {selectedOrder.shipping_address}, {selectedOrder.shipping_city} - {selectedOrder.shipping_pincode}</p>
                                <p><strong>Payment:</strong> {selectedOrder.payment_method?.toUpperCase()} ({selectedOrder.payment_status})</p>
                                <p><strong>Status:</strong>
                                    <span className={styles.badge} style={{ background: `${statusColors[selectedOrder.order_status]}20`, color: statusColors[selectedOrder.order_status], marginLeft: 8 }}>
                                        {selectedOrder.order_status}
                                    </span>
                                </p>
                            </div>
                            <h4>Items</h4>
                            <table className={styles.table}>
                                <thead><tr><th>Product</th><th>Size</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
                                <tbody>
                                    {orderItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.product_name}</td>
                                            <td>{item.size || '-'}</td>
                                            <td>{item.quantity}</td>
                                            <td>₹{parseFloat(item.price).toLocaleString()}</td>
                                            <td>₹{parseFloat(item.total).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className={styles.orderTotals}>
                                <p>Subtotal: ₹{parseFloat(selectedOrder.subtotal).toLocaleString()}</p>
                                {parseFloat(selectedOrder.discount_amount) > 0 && (
                                    <p>Discount: -₹{parseFloat(selectedOrder.discount_amount).toLocaleString()}</p>
                                )}
                                <p>Shipping: ₹{parseFloat(selectedOrder.shipping_cost).toLocaleString()}</p>
                                <p className={styles.orderGrandTotal}><strong>Total: ₹{parseFloat(selectedOrder.total).toLocaleString()}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
