import React, { createContext, useState, useEffect } from 'react';
import axios from "../axiosConfig";


// Create the CartContext
const CartContext = createContext();

// Create the CartProvider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ products: [] });
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true); // ✅ Move inside function


    const fetchCart = async () => {
        try {
            const response = await axios.get(`/cart?userId=1`); // ✅ Use query params
            console.log(response)
            setCart(response.data.cart);
            setTotalPrice(response.data.totalPrice);
        } catch (err) {
            console.error('Error fetching cart:', err);
        } finally {
            setLoading(false); // ✅ Stop loading after fetch
        }
    };
    

    useEffect(() => {
        fetchCart();
    }, []);

    const addToCart = async (productId, quantity) => {
        try {
            await axios.post('/cart', {
                userId: '1', // Replace with dynamic user ID
                productId,
                quantity
            });
            fetchCart();
        } catch (err) {
            console.error('Error adding to cart:', err);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        console.log(productId,quantity);
        try {
            await axios.put(`/cart/${productId}`, {
                userId: '1', // Replace with dynamic user ID
                quantity
            });
            fetchCart();
        } catch (err) {
            console.error('Error updating quantity:', err);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`/cart/${productId}`, {
                data: { userId: '1' } // Replace with dynamic user ID
            });
            fetchCart();
        } catch (err) {
            console.error('Error removing from cart:', err);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, totalPrice }}>
            {!loading && children}
        </CartContext.Provider>
    );
};

// Export CartContext explicitly
export default CartContext;