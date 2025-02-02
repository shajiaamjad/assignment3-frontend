import React from "react";
import { CartProvider } from "./context/CartContext";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar"; // Import Navbar
import "./App.css"; // Import global styles

function App() {
    return (
        <CartProvider>
            <Navbar />
            <div className="container">
                <h1 className="prod-catlog">Product Catalog</h1>
                <ProductList />
                <Cart />
            </div>
        </CartProvider>
    );
}

export default App;
