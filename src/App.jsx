import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Categories from "./Pages/Categories";
import AddProduct from "./Pages/AddProduct";
import ProductsPage from "./Pages/ProductsPage";
import Subcategories from "./Pages/Subcategories";
import EditProduct from "./Pages/EditProduct";

function App() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Layout */}
      <Route element={<Layout />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/subcategories" element={<Subcategories />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />


      </Route>

    </Routes>
  );
}

export default App;