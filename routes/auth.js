const express = require("express");
const router = express.Router();
const db = require("../config/db");

// REGISTER
router.post("/register", (req, res) => {

  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name,email,password) VALUES (?,?,?)";

  db.query(sql, [name, email, password], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Registration failed" });
    }

    res.json({ message: "User registered successfully" });

  });

});


// LOGIN
router.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {

    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: result[0]
    });

  });

});

module.exports = router;