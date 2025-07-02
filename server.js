const express = require("express");

const app = express();
const pool = require("./config/db");
const authRouter = require("./routes/authRoute")

app.use(express.json());

// Routes
app.use('/api/user', authRouter);

pool
  .getConnection()
  .then((conn) => {
    console.log("Connected to MySQL database");
    conn.release();
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
