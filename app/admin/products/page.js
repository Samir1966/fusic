'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [total, setTotal] = useState(0);
    const [form, setForm] = useState({
        name: '', slug: '', category: 'men', subcategory: '', price: '', original_price: '',
        discount: 0, sizes: 'S,M,L,XL,XXL', colors: '#1a1a1a', color_names: 'Black',
        image_url: '', description: '', fabric: '', fit: 'Regular', stock: 0,
        trending: false, new_arrival: false, is_active: true,
    });

    const fetchProducts = () => {
        setLoading(true);
        fetch(`/api/products?admin=true&search=${search}&limit=50`)
            .then((r) => r.json())
            .then((data) => {
                setProducts(data.products || []);
                setTotal(data.total || 0);
                setLoading(false);
            });
    };

    useEffect(() => { fetchProducts(); }, [search]);

    const openEdit = (p) => {
        setEditingProduct(p);
        setForm({
            name: p.name, slug: p.slug, category: p.category || 'men', subcategory: p.subcategory || '',
            price: p.price, original_price: p.original_price || '', discount: p.discount || 0,
            sizes: (p.sizes || []).join(','), colors: (p.colors || []).join(','),
            color_names: (p.color_names || []).join(','), image_url: p.image_url || '',
            description: p.description || '', fabric: p.fabric || '', fit: p.fit || 'Regular',
            stock: p.stock || 0, trending: p.trending || false, new_arrival: p.new_arrival || false,
            is_active: p.is_active !== false,
        });
        setShowModal(true);
    };

    const openNew = () => {
        setEditingProduct(null);
        setForm({
            name: '', slug: '', category: 'men', subcategory: '', price: '', original_price: '',
            discount: 0, sizes: 'S,M,L,XL,XXL', colors: '#1a1a1a', color_names: 'Black',
            image_url: '', description: '', fabric: '', fit: 'Regular', stock: 0,
            trending: false, new_arrival: false, is_active: true,
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            price: parseFloat(form.price),
            original_price: form.original_price ? parseFloat(form.original_price) : null,
            discount: parseInt(form.discount) || 0,
            stock: parseInt(form.stock) || 0,
            sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean),
            colors: form.colors.split(',').map((s) => s.trim()).filter(Boolean),
            color_names: form.color_names.split(',').map((s) => s.trim()).filter(Boolean),
        };

        const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
        const method = editingProduct ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
        });

        if (res.ok) {
            setShowModal(false);
            fetchProducts();
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this product?')) return;
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        fetchProducts();
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Products</h1>
                    <p className={styles.pageSubtitle}>{total} total products</p>
                </div>
                <button className={styles.primaryBtn} onClick={openNew}>+ Add Product</button>
            </div>

            <div className={styles.toolbar}>
                <input
                    type="text" placeholder="Search products..." value={search}
                    onChange={(e) => setSearch(e.target.value)} className={styles.searchInput}
                />
            </div>

            {loading ? <p className={styles.pageLoading}>Loading...</p> : (
                <div className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Image</th><th>Name</th><th>Category</th>
                                <th>Price</th><th>Stock</th><th>Status</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id}>
                                    <td><img src={p.image_url} alt="" className={styles.tableImg} /></td>
                                    <td>
                                        <strong>{p.name}</strong>
                                        {p.trending && <span className={styles.tinyBadge}>🔥</span>}
                                        {p.new_arrival && <span className={styles.tinyBadge}>🆕</span>}
                                    </td>
                                    <td>{p.category}</td>
                                    <td>
                                        <strong>₹{p.price}</strong>
                                        {p.original_price && <del className={styles.strike}> ₹{p.original_price}</del>}
                                    </td>
                                    <td>
                                        <span className={p.stock < 10 ? styles.lowStock : ''}>{p.stock}</span>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${p.is_active ? styles.badgeGreen : styles.badgeRed}`}>
                                            {p.is_active ? 'Active' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td>
                                        <button className={styles.actionBtn} onClick={() => openEdit(p)}>✏️</button>
                                        <button className={styles.actionBtn} onClick={() => handleDelete(p.id)}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                            <button onClick={() => setShowModal(false)} className={styles.closeBtn}>✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.modalForm}>
                            <div className={styles.formGrid}>
                                <div className={styles.inputGroup}>
                                    <label>Name *</label>
                                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Category</label>
                                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                        <option value="oversized">Oversized</option>
                                        <option value="hoodies">Hoodies</option>
                                        <option value="dresses">Dresses</option>
                                        <option value="festival">Festival</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Price (₹) *</label>
                                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Original Price (₹)</label>
                                    <input type="number" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Discount %</label>
                                    <input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Stock</label>
                                    <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Sizes (comma-separated)</label>
                                    <input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Fit</label>
                                    <select value={form.fit} onChange={(e) => setForm({ ...form, fit: e.target.value })}>
                                        <option value="Regular">Regular</option>
                                        <option value="Oversized">Oversized</option>
                                        <option value="Relaxed">Relaxed</option>
                                        <option value="Slim">Slim</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Image URL</label>
                                <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Description</label>
                                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Fabric</label>
                                <input value={form.fabric} onChange={(e) => setForm({ ...form, fabric: e.target.value })} />
                            </div>
                            <div className={styles.checkboxRow}>
                                <label><input type="checkbox" checked={form.trending} onChange={(e) => setForm({ ...form, trending: e.target.checked })} /> Trending</label>
                                <label><input type="checkbox" checked={form.new_arrival} onChange={(e) => setForm({ ...form, new_arrival: e.target.checked })} /> New Arrival</label>
                                <label><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active</label>
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setShowModal(false)} className={styles.cancelBtn}>Cancel</button>
                                <button type="submit" className={styles.primaryBtn}>{editingProduct ? 'Update Product' : 'Create Product'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
