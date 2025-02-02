import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import React, { useContext } from 'react';
import CartContext from '../context/CartContext'; // No curly braces


const Cart = () => {
    const { cart, updateQuantity, removeFromCart, totalPrice } = useContext(CartContext);

    return (
        <div className="container mt-4">
            <h2 className='your-crt'>Your Cart</h2>
            {cart.products.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.products.map((item, index) => (
                            <tr key={index}>
                                <td>{item.productId.name}</td>
                                <td>${item.productId.price}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        className="form-control"
                                        onChange={(e) => {
                                            const newQuantity = parseInt(e.target.value);
                                            if (!isNaN(newQuantity) && newQuantity >= 1) {
                                                updateQuantity(item.productId._id, newQuantity); // Update the quantity
                                            }
                                        }}
                                    />
                                </td>

                                <td>${(item.productId.price * item.quantity).toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeFromCart(item.productId._id)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="d-flex justify-content-end mt-3">
                <h3 className='your-crt'>Total Price: ${totalPrice.toFixed(2)}</h3>
            </div>
        </div>
    );

};

export default Cart;