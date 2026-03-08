const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/:user_id", (req, res) => {

  const { user_id } = req.params;

  const query = `
    SELECT * FROM orders
    WHERE user_id=?
    ORDER BY order_date DESC
  `;

  db.query(query, [user_id], (err, result) => {

    if (err) return res.status(500).json(err);

    res.json(result);

  });

});

module.exports = router;