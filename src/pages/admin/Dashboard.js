import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

function Dashboard(){

const [orders,setOrders] = useState([]);

useEffect(()=>{

axios.get("http://localhost:5000/api/admin/orders")
.then(res=>setOrders(res.data));

},[]);

const totalRevenue = orders.reduce(
(sum,o)=>sum + o.total_amount,
0
);

const chartData = {
labels: orders.map(o=>"Order "+o.id),
datasets:[
{
label:"Order Amount",
data: orders.map(o=>o.total_amount),
backgroundColor:"blue"
}
]
};

return(

<div style={{padding:"40px"}}>

<h1>Admin Dashboard</h1>

<h3>Total Orders: {orders.length}</h3>

<h3>Total Revenue: ₹{totalRevenue}</h3>

<div style={{width:"600px"}}>
<Bar data={chartData}/>
</div>

</div>

);

}

export default Dashboard;