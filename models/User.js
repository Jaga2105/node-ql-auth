const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const User ={
  create: async ({ email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    return result.insertId;
  },
  findByEmail: async (email) =>{
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  findById: async (id) => {
    const [rows] = await pool.execute('SELECT id, email, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  getAll: async()=> {
    const [rows] = await pool.execute('SELECT id, email, created_at FROM users');
    return rows;
  }
}
module.exports = User;