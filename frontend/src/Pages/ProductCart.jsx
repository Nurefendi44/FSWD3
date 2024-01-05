import React from "react";
import Layout from "../Components/Order/Layout";
import Navbar from "../Components/Navbar/Navbar";
import { useState } from "react";

const ProductCart = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleCategoryFilterChange = (categoryFilter) => {
    setCategoryFilter(categoryFilter);
  };
  return (
    
    <div>
     <Navbar onSearch={handleSearch} onCategoryFilterChange={handleCategoryFilterChange} />
      <Layout />
    </div>
  );
};

export default ProductCart;
