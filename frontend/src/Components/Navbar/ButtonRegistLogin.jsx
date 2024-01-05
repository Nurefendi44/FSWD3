import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useUserData from '../Auth/useUserData';


const ButtonRegistLogin = ({ totalItems }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userData = useUserData();
    const auth = localStorage.getItem('token');
    
    useEffect(() => {
        if (userData) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [userData]);

    return (
        <div>
            <div className="col-span-1  md:hidden text-right justify-end">
                <div className='flex '>
                    {auth ? (
                        <div className="flex text-right w-fit justify-end  ">
                            <Link to="/product-cart" className="bg-[#0B4AA9] text-white p-1 ml-2 block md:hidden relative">
                                <FaShoppingCart /> {totalItems > 0 && <span className="cart-count absolute -mt-6 -right-1 font-semibold bg-red-600 w-4 h-4 text-[11px] text-center rounded-full">{totalItems}</span>}
                            </Link>
                            <Link to="/profile" className="bg-[#0B4AA9] hover:text-[#C8EAC6] text-white p-1 ml-2 md:hidden block">
                                <FaUser />
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="bg-[#0B4AA9] hover:text-[#C8EAC6] text-white p-2 rounded-md ml-2 md:hidden block">
                                <FaUser />
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="mt-2 md:block hidden">
                <div className='flex font-semibold'>
                    {auth ? (
                        <div className="flex space-x-5 ">
                            <Link to="/product-cart" className="bg-[#0B4AA9]  text-white p-1 ml-2 hidden md:block relative">
                                <FaShoppingCart /> {totalItems > 0 && <span className="cart-count absolute -mt-6 -right-1 font-semibold bg-red-600 w-4 h-4 text-[11px] text-center rounded-full">{totalItems}</span>}
                            </Link>
                            <Link to="/profile" className="bg-[#0B4AA9] text-white p-1 ml-2 hidden md:block">
                                <FaUser />
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="bg-[#0B4AA9] hover:bg-[#C8EAC6] border hover:text-black text-white p-2 rounded-md ml-2 hidden md:block">
                                Login
                            </Link>
                            <Link to="/register" className="bg-[#0B4AA9] hover:bg-[#C8EAC6] hover:text-black border text-white p-2 rounded-md ml-2 hidden md:block">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ButtonRegistLogin;
