import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserData from '../Auth/useUserData';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useEffect } from 'react';

const Search = ({ onSearch, onCategoryFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);
    const userData = useUserData();
    const Navigate = useNavigate();
    const [totalItems, setTotalItems] = useState(0);


    useEffect(() => {
        if (userData) {
            const token = localStorage.getItem("token");
            fetch("http://127.0.0.1:8000/api/products", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    // Handle unauthorized or forbidden responses here
                    // Redirect the user to login page or show appropriate message
                    throw new Error("Unauthorized or Forbidden");
                })
                
                .catch(error => {
                    console.error("Error fetching product carts:", error);
                    // Handle other errors here
                });
        }
    }, [userData]);
    const handleChange = (e) => {
        setSearchTerm(e.target.value);

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        Navigate("/allproduct");
    };

    const handleSearchIconClick = () => {
        setSearchVisible(!searchVisible);
    };

    const handleCancelSearch = () => {
        setSearchTerm('');
        setSearchVisible(false);
        onSearch('');
    };

    return (
        <div className="col-span-1 relative w-full flex  justify-center">
            <form onSubmit={handleSubmit} className="flex rounded-md h-8  md:h-10 md:w-[80%] w-[90%] max-w-2xl relative">
                <input
                    type="text"
                    placeholder="Cari"
                    value={searchTerm}
                    onChange={handleChange}
                    className="p-1 pl-4 font-[Poppins] pr-4 rounded-md bg-white w-full"
                />
                <button type="submit" className="absolute right-1 top-0 bottom-0  rounded-md  text-bl p-1">
                    
                    <FaSearch />
                </button>
            </form>
        </div>
    );
};

export default Search;
