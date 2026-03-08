import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Address from "./pages/Address";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Register from "./pages/Register";

function App() {

  return (
    <BrowserRouter>

      <Navbar/>

      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />

        <Route path="/cart" element={<Cart/>} />
        <Route path="/orders" element={<Orders/>} />

        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route path="/address" element={<Address/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/payment" element={<Payment/>} />

      </Routes>

    </BrowserRouter>
  );

}

export default App;