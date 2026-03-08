const express = require("express");
const router = express.Router();
const db = require("../config/db");


/* ================= GET USER CART ================= */

router.get("/:userId", (req, res) => {

  const userId = req.params.userId;

  const sql = `
    SELECT cart.id, products.name, products.price, products.image, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching cart" });
    }

    res.json(result);

  });

});


/* ================= ADD PRODUCT TO CART ================= */

router.post("/add", (req, res) => {

  const { user_id, product_id, quantity } = req.body;

  const sql = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [user_id, product_id, quantity], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to add product to cart" });
    }

    res.json({ message: "Product added to cart" });

  });

});


/* ================= REMOVE PRODUCT FROM CART ================= */

router.delete("/remove/:id", (req, res) => {

  const cartId = req.params.id;

  const sql = "DELETE FROM cart WHERE id=?";

  db.query(sql, [cartId], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to remove item" });
    }

    res.json({ message: "Item removed from cart" });

  });

});


module.exports = router;