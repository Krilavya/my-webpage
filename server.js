// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Update these credentials carefully
const pool = new Pool({
  user: 'postgres',        // Your PostgreSQL username
  host: 'localhost',
  database: 'postgres',    // Make sure this database exists
  password: '7842',        // Password as a string
  port: 5432
});

// Test route to verify DB connection
app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Connected Successfully', time: result.rows[0] });
  } catch (err) {
    console.error('DB Test Error:', err);
    res.status(500).json({ error: 'DB Test Failed' });
  }
});

// Registration endpoint
app.post('/register', async (req, res) => {
  const { name, email, password, gender, address } = req.body;
  console.log('Received from frontend:', req.body);

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password, gender, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, password, gender, address]
    );
    console.log('Insert successful:', result.rows[0]);
    res.json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('✅ Server running on port 5000');
});
