const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= DATABASE CONNECTION ================= */

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"Nikhi#2004",
database:"shopping_db"
});

db.connect((err)=>{

if(err){
console.log("Database connection failed:",err);
}else{
console.log("Database connected successfully");
}

});


/* ================= REGISTER ================= */

app.post("/register",(req,res)=>{

const {name,email,password} = req.body;

const sql = "INSERT INTO users (name,email,password) VALUES (?,?,?)";

db.query(sql,[name,email,password],(err,result)=>{

if(err){
return res.json({success:false,message:"Email already exists"});
}

res.json({
success:true,
message:"Registration successful"
});

});

});


/* ================= LOGIN ================= */

app.post("/login",(req,res)=>{

const {email,password} = req.body;

const sql = "SELECT * FROM users WHERE email=? AND password=?";

db.query(sql,[email,password],(err,result)=>{

if(err) return res.json({success:false});

if(result.length === 0){

return res.json({
success:false,
message:"Invalid email or password"
});

}

const user = result[0];

res.json({
success:true,
user:{
id:user.id,
name:user.name,
email:user.email
}
});

});

});


/* ================= GET ALL PRODUCTS ================= */

app.get("/products",(req,res)=>{

db.query("SELECT * FROM products",(err,result)=>{

if(err) return res.json(err);

res.json(result);

});

});


/* ================= GET SINGLE PRODUCT ================= */

app.get("/products/:id",(req,res)=>{

const id = req.params.id;

db.query(
"SELECT * FROM products WHERE id=?",
[id],
(err,result)=>{

if(err) return res.json(err);

res.json(result[0]);

});

});


/* ================= ADD TO CART ================= */

app.post("/add-to-cart",(req,res)=>{

const {user_id,product_id,quantity} = req.body;

const sql =
"INSERT INTO cart (user_id,product_id,quantity) VALUES (?,?,?)";

db.query(sql,[user_id,product_id,quantity],(err,result)=>{

if(err) return res.json(err);

res.json({
success:true,
message:"Added to cart"
});

});

});


/* ================= GET USER CART ================= */

app.get("/cart/:userId",(req,res)=>{

const userId = req.params.userId;

const sql = `
SELECT cart.id,
products.name,
products.price,
products.image,
cart.quantity
FROM cart
JOIN products ON cart.product_id = products.id
WHERE cart.user_id=?
`;

db.query(sql,[userId],(err,result)=>{

if(err) return res.json(err);

res.json(result);

});

});


/* ================= PLACE ORDER ================= */

app.post("/place-order",(req,res)=>{

const {user_id,total,address,payment_status} = req.body;

const sql =
"INSERT INTO orders (user_id,total_amount,address,payment_status) VALUES (?,?,?,?)";

db.query(sql,[user_id,total,address,payment_status],(err,result)=>{

if(err) return res.json(err);

res.json({
success:true,
message:"Order placed successfully"
});

});

});


/* ================= USER ORDERS ================= */
/* Only logged in user's orders */

app.get("/orders/:userId",(req,res)=>{

const userId = req.params.userId;

const sql = `
SELECT orders.id,
products.name,
products.price,
products.image,
orders.total_amount,
orders.address,
orders.payment_status,
orders.order_date
FROM orders
JOIN products ON orders.product_id = products.id
WHERE orders.user_id=?
ORDER BY orders.id DESC
`;

db.query(sql,[userId],(err,result)=>{

if(err) return res.json(err);

res.json(result);

});

});


/* ================= ADMIN ALL ORDERS ================= */

app.get("/admin/orders",(req,res)=>{

const sql = `
SELECT orders.id,
users.name,
products.name AS product_name,
products.price,
orders.total_amount,
orders.address,
orders.payment_status,
orders.order_date
FROM orders
JOIN users ON orders.user_id = users.id
JOIN products ON orders.product_id = products.id
ORDER BY orders.id DESC
`;

db.query(sql,(err,result)=>{

if(err) return res.json(err);

res.json(result);

});

});


/* ================= DELETE CART ITEM ================= */

app.delete("/cart/:id",(req,res)=>{

const id = req.params.id;

db.query(
"DELETE FROM cart WHERE id=?",
[id],
(err,result)=>{

if(err) return res.json(err);

res.json({success:true});

});

});


/* ================= START SERVER ================= */

app.listen(5000,()=>{

console.log("Server running on port 5000");

});