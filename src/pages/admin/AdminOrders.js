import axios from "axios";
import { useEffect, useState } from "react";

function AdminOrders(){

const [orders,setOrders] = useState([]);

useEffect(()=>{

axios.get("http://localhost:5000/admin/orders")
.then(res=>{
setOrders(res.data);
});

},[]);

return(

<div style={{padding:"40px"}}>

<h1>All Orders</h1>

<table border="1" cellPadding="10">

<thead>

<tr>
<th>User</th>
<th>Amount</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{orders.map(order=>(

<tr key={order.id}>

<td>{order.name}</td>
<td>₹{order.total_amount}</td>
<td>{order.payment_status}</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default AdminOrders;