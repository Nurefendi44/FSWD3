import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Home from "./Pages/Home";
import CategoryPage from "./Pages/CategoryPage";
import ProductDetail from "./Pages/ProductDetail";
import UserRegister from "./Pages/UserRegister";
import UserLogin from "./Pages/UserLogin";
import Profile from "./Pages/Profile";
import ProductCart from "./Pages/ProductCart";
import Navbar from "./Components/Navbar/Navbar";
import OrderHistoryPage from "./Pages/OrderHistoryPage";
import Ulasan from "./Pages/Ulasan";
import useUserData from "./Components/Auth/useUserData";
import Sidebar from "./Components/Navbar/Sidebar";
import Search from "./Components/Navbar/Search";
import ButtonRegistLogin from "./Components/Navbar/ButtonRegistLogin";
import ScrollOnTop from "./Pages/ScrollonTop";

import Lebah from "../src/Components/img/lebah.png";
import "./App.css";
import Allproduct from "./Components/Product/AllProduct";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const userData = useUserData();
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true); // Set loading to true when starting a new route
    fetch("https://admin.galoostore.com/api/productcarts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Unauthorized or Forbidden");
      })
      .then((data) => {
        setTotalItems(data.cartItems.length);
      })
      .catch((error) => {
        console.error("Error fetching product carts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]); // Trigger the effect when the route changes

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleCategoryFilterChange = (categoryFilter) => {
    setCategoryFilter(categoryFilter);
  };

  return (
    <div>
      {loading && (
        <div className="fixed bg-white  top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <img src={Lebah} width={150} className="animate-bee" alt="Lebah" />
        </div>
      )}

      <div
        className={`h-14  md:h-24 bg-[#0B4AA9] fixed top-0 left-0 w-full z-50 ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <Sidebar />
        <div className="flex w-4/5 justify-center  items-center my-auto  mx-auto">
          <div className="w-1/4">
            <Navbar />
          </div>
          <div className="w-1/2 ">
            <Search
              onSearch={handleSearch}
              onCategoryFilter={handleCategoryFilterChange}
            />
          </div>

          <div className="w-1/4 md:justify-end flex ">
            <ButtonRegistLogin totalItems={totalItems} />
          </div>
        </div>
      </div>

      <Routes>
        {/* Add the loading prop to each page component */}
        <Route
          path="/"
          element={
            <Home
              search={searchTerm}
              filter={categoryFilter}
              loading={loading}
            />
          }
        />
        <Route path="/register" element={<UserRegister loading={loading} />} />
        <Route path="/login" element={<UserLogin loading={loading} />} />
        <Route path="/profile" element={<Profile loading={loading} />} />
        <Route
          path="/category/:categoryId"
          element={<CategoryPage loading={loading} />}
        />
        <Route
          path="/product/:productId"
          element={<ProductDetail loading={loading} />}
        />
        <Route
          path="/product-cart"
          element={<ProductCart loading={loading} />}
        />
        <Route
          path="/order-history"
          element={<OrderHistoryPage loading={loading} />}
        />
        <Route
          path="/allproduct"
          element={
            <Allproduct
              search={searchTerm}
              filter={categoryFilter}
              loading={loading}
            />
          }
        />
        <Route
          path="/ulasan/:productId/:orderId"
          element={<Ulasan loading={loading} />}
        />
       
      </Routes>

      {!loading }

      <ScrollOnTop />
    </div>
  );
}

export default App;
