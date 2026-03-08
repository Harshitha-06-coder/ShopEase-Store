router.get("/:id", (req, res) => {

  const id = req.params.id;

  const sql = "SELECT * FROM products WHERE id=?";

  db.query(sql, [id], (err, result) => {

    if (err) return res.status(500).json(err);

    res.json(result[0]);

  });

});