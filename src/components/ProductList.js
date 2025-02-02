import { useState, useEffect, useContext } from "react";
import axios from "../axiosConfig";
import CartContext from "../context/CartContext";
import "./ProductList.css"; // Import CSS
import { FaShoppingCart } from "react-icons/fa";


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        axios.get("/products/getproducts")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    return (
        <div className="product-list">
            {products.map(product => (
             <div className="product-card" key={product._id}>
             <div className="product-image">
                 <img src={product.picture} alt={product.name} />
             </div>
         
             <div className="product-info">
                 <h3>{product.name}</h3>
                 <p>{product.description}</p>
             </div>
         
             {/* Price & Add to Cart Container */}
             <div className="product-footer">
                 <p className="price">Price: ${product.price}</p>
                 <button className="add-to-cart" onClick={() => addToCart(product._id, 1)}>
                     <FaShoppingCart /> Add to Cart
                 </button>
             </div>
         </div>
         
            ))}
        </div>
    );
};

export default ProductList;
