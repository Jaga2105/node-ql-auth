const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const { secret, expiresIn } = require('../config/jwt');
const { validationResult } = require("express-validator");
const User = require("../models/User");
const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
};
