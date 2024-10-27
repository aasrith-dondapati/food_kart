# food_ordering_app

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd food_ordering_app

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Create a database named Food.

# Create the following tables in the Food database:

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  imageUrl TEXT NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL,
  price DECIMAL(5,2) NOT NULL
);

# Insert seed data into the products table:
INSERT INTO products (name, price, imageUrl) VALUES
('Macaron Mix of Five', 8.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa4jPMBagClOg2gi89fda6BcAAy0AK-yPhJw&s'),
('Classic Tiramisu', 5.50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwpiNxJmAUp7mBJ5I_o_fwAPX4afShMG54tQ&s'),
('Pistachio Baklava', 4.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeNM062ynUiW08IjioplfMpiwDBorApTJYsg&s'),
('Lemon Meringue Pie', 5.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYvhymXBfGHX4m8o0pmYBPqRf5NVrCJqX5_g&s'),
('Red Velvet Cake', 4.50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtsS5BAUd-AkmqpCQ_cf_eEeNNq1D_ZabJew&s'),
('Salted Caramel Brownie', 5.50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMpPP5HtUjYvPqLh_Mmj57xacR2LczBBTZkg&s'),
('Vanilla Panna Cotta', 6.50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMS8pRrjrp0VyeWRuxkjW0RPTpK2oHWkTVg&s');

# In the server directory
npm start

# In the client directory
npm run dev

# Navigate to http://localhost:5173/ in your browser to access the app.

# Add Products to Cart: Browse the products and add them to your cart.
# Apply Coupons:
# HAPPYHOURS applies an 18% discount.
# BUYGETONE applies a discount by making the lowest-priced item free.
# Confirm Order: Once the cart is finalized, click "Confirm Order" to store the order in the database.

# The backend will run on http://localhost:5001 by default, and the frontend on http://localhost:5173