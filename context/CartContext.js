'use client';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toast, setToast] = useState(null);

    // Load cart from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('fusic-cart');
            if (saved) setItems(JSON.parse(saved));
        } catch (e) { }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('fusic-cart', JSON.stringify(items));
    }, [items]);

    const showToast = useCallback((message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    }, []);

    const addToCart = useCallback((product, size, color, quantity = 1) => {
        setItems(prev => {
            const existingIndex = prev.findIndex(
                item => item.id === product.id && item.size === size && item.color === color
            );
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex].quantity += quantity;
                return updated;
            }
            return [...prev, {
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                size,
                color,
                quantity,
                gradient: product.gradient,
                slug: product.slug,
            }];
        });
        showToast(`${product.name} added to cart! 🛒`);
    }, [showToast]);

    const removeFromCart = useCallback((id, size, color) => {
        setItems(prev => prev.filter(
            item => !(item.id === id && item.size === size && item.color === color)
        ));
    }, []);

    const updateQuantity = useCallback((id, size, color, newQty) => {
        if (newQty < 1) return;
        setItems(prev => prev.map(item =>
            item.id === id && item.size === size && item.color === color
                ? { ...item, quantity: newQty }
                : item
        ));
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartSavings = items.reduce(
        (sum, item) => sum + ((item.originalPrice - item.price) * item.quantity),
        0
    );

    return (
        <CartContext.Provider value={{
            items,
            cartCount,
            cartTotal,
            cartSavings,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            toast,
        }}>
            {children}
            {toast && <div className="toast">{toast}</div>}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}
