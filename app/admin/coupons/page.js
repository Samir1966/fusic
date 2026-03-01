'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AdminCoupons() {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [form, setForm] = useState({
        code: '', description: '', type: 'percentage', value: '',
        min_order: '', max_discount: '', usage_limit: '', is_active: true, expires_at: '',
    });

    const fetchCoupons = () => {
        setLoading(true);
        fetch('/api/coupons').then((r) => r.json()).then((data) => {
            setCoupons(data.coupons || []);
            setLoading(false);
        });
    };

    useEffect(() => { fetchCoupons(); }, []);

    const openNew = () => {
        setEditingCoupon(null);
        setForm({ code: '', description: '', type: 'percentage', value: '', min_order: '', max_discount: '', usage_limit: '', is_active: true, expires_at: '' });
        setShowModal(true);
    };

    const openEdit = (c) => {
        setEditingCoupon(c);
        setForm({
            code: c.code, description: c.description || '', type: c.type, value: c.value,
            min_order: c.min_order || '', max_discount: c.max_discount || '', usage_limit: c.usage_limit || '',
            is_active: c.is_active, expires_at: c.expires_at ? c.expires_at.slice(0, 10) : '',
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            value: parseFloat(form.value),
            min_order: form.min_order ? parseFloat(form.min_order) : 0,
            max_discount: form.max_discount ? parseFloat(form.max_discount) : null,
            usage_limit: form.usage_limit ? parseInt(form.usage_limit) : null,
            expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null,
        };

        const url = editingCoupon ? `/api/coupons/${editingCoupon.id}` : '/api/coupons';
        const method = editingCoupon ? 'PUT' : 'POST';

        const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (res.ok) { setShowModal(false); fetchCoupons(); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this coupon?')) return;
        await fetch(`/api/coupons/${id}`, { method: 'DELETE' });
        fetchCoupons();
    };

    const toggleActive = async (coupon) => {
        await fetch(`/api/coupons/${coupon.id}`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_active: !coupon.is_active }),
        });
        fetchCoupons();
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Coupons</h1>
                    <p className={styles.pageSubtitle}>{coupons.length} coupons</p>
                </div>
                <button className={styles.primaryBtn} onClick={openNew}>+ Create Coupon</button>
            </div>

            {loading ? <p className={styles.pageLoading}>Loading...</p> : (
                <div className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Code</th><th>Type</th><th>Value</th><th>Min Order</th>
                                <th>Used</th><th>Status</th><th>Expires</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((c) => (
                                <tr key={c.id}>
                                    <td><strong className={styles.mono}>{c.code}</strong></td>
                                    <td>{c.type === 'percentage' ? '% Off' : '₹ Flat'}</td>
                                    <td>{c.type === 'percentage' ? `${c.value}%` : `₹${c.value}`}</td>
                                    <td>₹{c.min_order || 0}</td>
                                    <td>{c.used_count || 0}/{c.usage_limit || '∞'}</td>
                                    <td>
                                        <button
                                            className={`${styles.badge} ${c.is_active ? styles.badgeGreen : styles.badgeRed}`}
                                            onClick={() => toggleActive(c)}
                                            style={{ cursor: 'pointer', border: 'none' }}
                                        >
                                            {c.is_active ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td>{c.expires_at ? new Date(c.expires_at).toLocaleDateString('en-IN') : 'Never'}</td>
                                    <td>
                                        <button className={styles.actionBtn} onClick={() => openEdit(c)}>✏️</button>
                                        <button className={styles.actionBtn} onClick={() => handleDelete(c.id)}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{editingCoupon ? 'Edit Coupon' : 'Create Coupon'}</h2>
                            <button onClick={() => setShowModal(false)} className={styles.closeBtn}>✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.modalForm}>
                            <div className={styles.formGrid}>
                                <div className={styles.inputGroup}>
                                    <label>Code *</label>
                                    <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required placeholder="WELCOME10" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Type</label>
                                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="flat">Flat (₹)</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Value *</label>
                                    <input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Min Order (₹)</label>
                                    <input type="number" value={form.min_order} onChange={(e) => setForm({ ...form, min_order: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Max Discount (₹)</label>
                                    <input type="number" value={form.max_discount} onChange={(e) => setForm({ ...form, max_discount: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Usage Limit</label>
                                    <input type="number" value={form.usage_limit} onChange={(e) => setForm({ ...form, usage_limit: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Expires On</label>
                                    <input type="date" value={form.expires_at} onChange={(e) => setForm({ ...form, expires_at: e.target.value })} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Description</label>
                                <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Welcome offer — 10% off" />
                            </div>
                            <div className={styles.checkboxRow}>
                                <label><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active</label>
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setShowModal(false)} className={styles.cancelBtn}>Cancel</button>
                                <button type="submit" className={styles.primaryBtn}>{editingCoupon ? 'Update Coupon' : 'Create Coupon'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
