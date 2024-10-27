// Import necessary modules
import express from 'express';
import http from 'http';
import cors from 'cors'; // Import cors
import pool from './db.js';  // Import the database connection from db.js

// Initialize Express app
const app = express();
//const port = 5001;

const server = http.createServer(app);
const PORT = process.env.PORT || 5001;

// Enable CORS middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Define API route
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, price, imageUrl FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Database query error' });
  }
});

// New route to save an order
app.post('/api/orders', async (req, res) => {
    const { orderItems, total } = req.body;
    try {
      // Insert order into the database
      const orderResult = await pool.query(
        'INSERT INTO orders (total_amount) VALUES ($1) RETURNING id',
        [total]
      );
      const orderId = orderResult.rows[0].id;
  
      // Insert each item in the order
      const itemPromises = orderItems.map((item) =>
        pool.query(
          'INSERT INTO order_items (order_id, product_name, quantity, amount) VALUES ($1, $2, $3, $4)',
          [orderId, item.name, item.quantity, item.price * item.quantity]
        )
      );
      await Promise.all(itemPromises);
  
      res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
      console.error('Error saving order:', error);
      res.status(500).json({ error: 'Failed to save order' });
    }
  });
  

// Start server
//app.listen(port, () => {
  //console.log(`Backend server running at http://localhost:${port}`);
//});

server.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});

export default server;