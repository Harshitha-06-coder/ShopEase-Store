import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar(){

const navigate = useNavigate();

const [search,setSearch] = useState("");

const user = JSON.parse(localStorage.getItem("user"));
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const logout=()=>{
localStorage.removeItem("user");
navigate("/login");
};

const searchProduct=(e)=>{

e.preventDefault();

navigate(`/products?search=${search}`);

};

return(

<div style={styles.navbar}>

<h2 style={{cursor:"pointer"}} onClick={()=>navigate("/")}>
ShopEase
</h2>

<form onSubmit={searchProduct}>

<input
type="text"
placeholder="Search products..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={styles.search}
/>

<button style={styles.searchBtn}>
Search
</button>

</form>

<div style={styles.links}>

<Link style={styles.link} to="/">Home</Link>
<Link style={styles.link} to="/products">Products</Link>

{user && <Link style={styles.link} to="/orders">Orders</Link>}

{user && (
<Link style={styles.link} to="/cart">
Cart ({cart.length})
</Link>
)}

{!user && <Link style={styles.link} to="/login">Login</Link>}
{!user && <Link style={styles.link} to="/register">Register</Link>}

{user && (
<button onClick={logout} style={styles.logout}>
Logout
</button>
)}

</div>

</div>

)

}

const styles={

navbar:{
background:"linear-gradient(90deg,#1e3c72,#2a5298)",
padding:"15px 40px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
color:"white"
},

search:{
padding:"7px",
borderRadius:"5px",
border:"none"
},

searchBtn:{
marginLeft:"5px",
padding:"7px 12px",
background:"#ff9800",
border:"none",
borderRadius:"5px"
},

links:{
display:"flex",
gap:"20px",
alignItems:"center"
},

link:{
color:"white",
textDecoration:"none"
},

logout:{
background:"red",
color:"white",
border:"none",
padding:"6px 12px",
borderRadius:"5px"
}

};

export default Navbar;