// OrderConfirmation.jsx
import { useCallback,useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const OrderConfirmation = ({ orderItems, total, onClose }) => {
  // Function to send order data to backend
  const submitOrder = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderItems, total }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit order');
      }
      console.log('Order submitted successfully');
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  }, [orderItems, total]);
  
  useEffect(() => {
    submitOrder();
  }, [submitOrder]); 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} />
          Your order has been Confirmed
        </h2>
        <p>We hope you enjoy your food!</p>
        <div className="order-summary">
          {orderItems.map(item => (
            <div key={item.id} className="order-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-total">
            <strong>Order Total:</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>Start New Order</button>
      </div>
    </div>
  );
};

OrderConfirmation.propTypes = {
  orderItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderConfirmation;
