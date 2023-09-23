import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import axios from "axios";
import SalesPage from "./components/Sales/SalesPage";
import MobilesPage from "./components/Product_Page/MobilesPage";
import ProductPage from "./components/Product_Page/ProductPage";
import FrequentPage from "./components/Frequent/FrequentPage";

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
      </Routes>
    </>
  );
}

export default App;
