import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import ProductListCategory from "../Components/Product/ProductListCategory";
import Slider from "../Components/Header/Slider";
import { useEffect } from "react";
import axios from "axios";

const CategoryPage = ({ search, filter, loading }) => {
  const [categoryId, setCategoryId] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://admin.galoostore.com/api/categories/${categoryId}`
        );

        if (response.status === 200) {
          setCategoryData(response.data.data);
        } else {
          console.error("Error fetching category:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchData();
  }, [categoryId]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleCategoryFilterChange = (categoryFilter) => {
    setCategoryFilter(categoryFilter);
  };

  return (
    <>
      <div className=" w-full">
        <Slider />
        <div className="  ">
          <ProductListCategory searchTerm={handleSearch} categoryFilter={handleCategoryFilterChange} />

        </div>

      </div>
    </>
  );
};

export default CategoryPage;


