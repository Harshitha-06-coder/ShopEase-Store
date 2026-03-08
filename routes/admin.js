const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* Add Product */

router.post("/add-product", (req, res) => {

  const { name, price, category, stock, image } = req.body;

  const query = `
    INSERT INTO products (name,price,category,stock,image)
    VALUES (?,?,?,?,?)
  `;

  db.query(query, [name, price, category, stock, image], (err) => {

    if (err) return res.status(500).json(err);

    res.json({ message: "Product added" });

  });

});


/* Delete Product */

router.delete("/product/:id", (req, res) => {

  db.query("DELETE FROM products WHERE id=?", [req.params.id], (err) => {

    if (err) return res.status(500).json(err);

    res.json({ message: "Deleted" });

  });

});

module.exports = router;