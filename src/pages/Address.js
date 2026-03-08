import { useNavigate } from "react-router-dom";

function Address(){

const navigate = useNavigate();

const next = ()=>{

navigate("/payment");

}

return(

<div style={{padding:"40px"}}>

<h2>Delivery Address</h2>

<input placeholder="Name"/><br/><br/>
<input placeholder="Phone"/><br/><br/>
<textarea placeholder="Address"></textarea><br/><br/>

<button
onClick={next}
style={{
background:"green",
color:"white",
padding:"10px",
border:"none"
}}
>
Continue to Payment
</button>

</div>

)

}

export default Address;