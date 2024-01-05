import { useEffect } from 'react';
import useUserData from '../Components/Auth/useUserData';
import Slider from '../Components/Header/Slider';
import ButtonRegistLogin from '../Components/Navbar/ButtonRegistLogin';
import Navbar from '../Components/Navbar/Navbar';
import Search from '../Components/Navbar/Search';
import Sidebar from '../Components/Navbar/Sidebar';
import ProductListNew from '../Components/Product/ProductListNew';
import { React, useState } from 'react';
import axios from 'axios';
import CS from '../Components/CS'


const Home = ({ search, filter }) => {
  const userData = useUserData();
  const [totalItems, setTotalItems] = useState(0);




  useEffect(() => {
    if (userData) {
      const token = localStorage.getItem("token");
      axios.get("https://admin.galoostore.com/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.status === 200) {
            return response.data;
          }

          throw new Error("Unauthorized or Forbidden");
        })
        .then(data => {
          setTotalItems(data.cartItems.length);
        })
        .catch(error => {
          console.error("Error fetching product carts:", error);
        });
    }
  }, [userData]);

  return (
    <>

      <Slider />

      <div className='bg-[#C8EAC6] w-3/4 mx-auto h-14 rounded-md mt-10'>
        <h1 className='text-center text-[#006F2B] font-[Poppins] text-xl font-bold items-center py-4  '>Produk Terbaru</h1>
      </div>
      <ProductListNew searchTerm={search} categoryFilter={filter} />

      <CS />
    </>
  );
};

export default Home;
