DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  whole_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT false
);
DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  price DECIMAL(4, 2),
  item_name TEXT,
  item_photo_url VARCHAR(255) NOT NULL,
  item_description VARCHAR(955) NOT NULL
);
DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  users_id INTEGER,
  order_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estimate_time_minute INTEGER DEFAULT 25,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  bill_paid BOOLEAN DEFAULT true,
  message TEXT,
  FOREIGN KEY (users_id) REFERENCES users(id)
);
DROP TABLE IF EXISTS order_items CASCADE;
CREATE TABLE order_items (
  items_id INTEGER,
  order_id INTEGER,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (items_id) REFERENCES items(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);


/* GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO www;*/




