import React, { useEffect, useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Logo from '../img/logoutama.jpeg';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import useUserData from '../Auth/useUserData';
import Search from './Search';
import axios from 'axios';

const Navbar = ({ onSearch, onCategoryFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);
    const userData = useUserData();
    const Navigate = useNavigate();
    const [totalItems, setTotalItems] = useState(0);


    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        Navigate("/");
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
        <div>
            <div className="  ">
                <div className="md:col-span-1 pl-2   ">
                    <Link to="/">


                        <img src={Logo} className="w-full z-50 md:w-36 mt-2 my-2 flex items-center md:h-20 h-10" alt="" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
