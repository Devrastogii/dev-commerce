import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import axios from "axios";
import SalesPage from "./components/Sales/SalesPage";
import MobilesPage from "./components/Product_Page/MobilesPage";
import ProductPage from "./components/Product_Page/ProductPage";
import FrequentPage from "./components/Frequent/FrequentPage";
import Wishlist from "./components/Wishlist/Wishlist";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Account from "./components/Auth/Account";

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales_page" element={<SalesPage />} />
        <Route path="/mobiles_page" element={<MobilesPage/>} />
        <Route path="/product-page" element={<ProductPage />} />            
        <Route path="/frequent_page" element={<FrequentPage />} />  
        <Route path="/wishlist" element={<Wishlist />} />    
        <Route path="/new-user-register" element={<Register />} />  
        <Route path="/login-user" element={<Login />} />    
        <Route path="/profile" element={<Account />} />    
      </Routes>
    </>
  );
}

export default App;
