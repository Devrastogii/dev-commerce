import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import axios from "axios";
import SalesPage from "./components/SalesPage";
import MobilesPage from "./components/MobilesPage";
import ProductPage from "./components/ProductPage";

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
      </Routes>
    </>
  );
}

export default App;
