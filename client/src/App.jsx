import { useState } from 'react';
import ProductList from './components/ProductList.jsx';
import Cart from './components/Cart.jsx';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateCartItem = (id, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0)); // Remove item if quantity goes to 0
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]); // Clear the cart (set it to an empty array)
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="app-container">
      <ProductList addToCart={addToCart} cartItems={cartItems} updateCartItem={updateCartItem} />
      <Cart
        cartItems={cartItems}
        updateCartItem={updateCartItem}
        removeItem={removeItem}
        total={total}
        clearCart={clearCart}  /* Pass the clearCart function to the Cart */
      />
    </div>
  );
};

export default App;
