import { useState } from 'react';
import PropTypes from 'prop-types';
import OrderConfirmation from './OrderConfirmation';

const Cart = ({ cartItems, removeItem, total, clearCart }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleConfirmOrder = () => {
    setModalVisible(true); // Show modal when "Confirm Order" is clicked
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Hide modal and reset cart
    clearCart(); // Clear the cart after closing the modal (start a new order)
  };

  const applyDiscountCode = () => {
    if (discountCode === 'HAPPYHOURS') {
      const discount = total * 0.18; // 18% discount
      setDiscountAmount(discount);
      setErrorMessage('');
    } else if (discountCode === 'BUYGETONE') {
      const lowestPrice = Math.min(...cartItems.map(item => item.price));
      setDiscountAmount(lowestPrice); // Deduct the price of the lowest priced item
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid discount code');
      setDiscountAmount(0);
    }
  };

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const finalTotal = total - discountAmount;

  return (
    <div className="cart">
      <h2>Your Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
          {cartItems.map(item => (
  <div key={item.id} className="cart-item">
    <div className="cart-item-details">
      <h3>{item.quantity}x {item.name}</h3>
      <p>@${Number(item.price || 0).toFixed(2)} = ${(Number(item.price || 0) * item.quantity).toFixed(2)}</p>
    </div>
    <div className="cart-item-controls">
      <button className="remove-btn" onClick={() => removeItem(item.id)}>✖</button>
    </div>
  </div>
))}

          </div>
          <div className="cart-total">
            <h3>Order Total: ${finalTotal.toFixed(2)}</h3>
            <p>This is a carbon-neutral delivery</p>
          </div>

          {/* Discount Code Section */}
          <div className="discount-code">
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={handleDiscountCodeChange}
            />
            <button onClick={applyDiscountCode}>Apply</button>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>

          {discountAmount > 0 && (
            <div className="discount-applied">
              <p>Discount Applied: -${discountAmount.toFixed(2)}</p>
            </div>
          )}

          <button className="checkout-btn" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </>
      )}

      {/* Show Order Confirmation Modal */}
      {isModalVisible && (
        <OrderConfirmation
          orderItems={cartItems}
          total={finalTotal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  updateCartItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  clearCart: PropTypes.func.isRequired,
};

export default Cart;
