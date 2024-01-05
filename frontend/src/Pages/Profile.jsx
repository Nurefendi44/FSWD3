import React from 'react'
import Account from '../Components/Auth/Account'
import Navbar from '../Components/Navbar/Navbar'
import { useState } from 'react'






const Profile = () => {
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
        <Account/>
    </div>
  )
}

export default Profile