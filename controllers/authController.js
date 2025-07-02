const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

// const { secret, expiresIn } = require('../config/jwt');
const { validationResult } = require("express-validator");
const User = require("../models/User");
const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

module.exports = {
  // Register
  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const userId = await User.create({ email, password });
      const user = await User.findById(userId);

      const token = jwt.sign({ id: user.id }, secret, { expiresIn:expiresIn });

      res.status(201).json({ token, user });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
  // Login
  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id }, secret, { expiresIn:expiresIn });

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
        },
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
};

