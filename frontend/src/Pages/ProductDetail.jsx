import React, { useState } from 'react'
import ProductDetails from '../Components/Product/ProductDetails'
import Navbar from '../Components/Navbar/Navbar'


const ProductDetail = ({loading}) => {
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
      <ProductDetails />
    </div>
  )
}

export default ProductDetail