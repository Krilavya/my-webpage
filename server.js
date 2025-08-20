const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();


app.use(cors());
app.use(express.json());


const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  database: process.env.DB_NAME || 'mydb',
  password: process.env.DB_PASS || 'mypassword',
  host: 'localhost',
  port: 5432
});



app.post('/register', async (req, res) => {
const { name, email, password, gender, address } = req.body;
try {
const result = await pool.query(
'INSERT INTO users (name, email, password, gender, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
[name, email, password, gender, address]
);
res.json({ message: 'User registered successfully', user: result.rows[0] });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Database error' });
}
});


app.listen(5000, () => {
console.log('Server running on port 5000');
});