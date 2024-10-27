import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProductList = ({ addToCart, cartItems, updateCartItem }) => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        {/*console.log(data);*/}
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to get quantity from cart items
  const getCartQuantity = (productId) => {
    const item = cartItems.find(cartItem => cartItem.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="product-list">
      <h2>Desserts</h2>
      <div className="product-grid">
      {products.map(product => (
  <div key={product.id} className="product-card">
     <img src={encodeURI(product.imageurl)} alt={product.name} className="product-image" />
    {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjLWWia07XlYcaXwLB19f_GpalAihOtP2tuA&s' alt={product.name} className="product-image" /> */}
    <div className="product-info">
      <h3>{product.name}</h3>
      <p>${Number(product.price).toFixed(2)}</p> {/* Ensure price is a number */}
    </div>
    <div className="cart-actions">
      {getCartQuantity(product.id) > 0 ? (
        <div className="cart-quantity-controls">
          <button onClick={() => updateCartItem(product.id, getCartQuantity(product.id) - 1)}>-</button>
          <span>{getCartQuantity(product.id)}</span>
          <button onClick={() => updateCartItem(product.id, getCartQuantity(product.id) + 1)}>+</button>
        </div>
      ) : (
        <button data-testid={`add-to-cart-${product.id}`} className="add-to-cart" onClick={() => addToCart(product)}>
          <i className="cart-icon">🛒</i> Add to Cart
        </button>
      )}
    </div>
  </div>
))}

           
      </div>
    </div>
  );
};

ProductList.propTypes = {
  addToCart: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
  updateCartItem: PropTypes.func.isRequired,
};

export default ProductList;
