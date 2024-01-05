import React, { useState } from 'react';
import ProductCartAPI from './ProductCartAPI';
import Order from './Order';
import axios from 'axios';


const Layout = () => {
  const [selectedProductCartId, setSelectedProductCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Definisikan state cartItems
  const [selectedCartItem, setSelectedCartItem] = useState(null);

  const handleProductCartSelect = (productsId, cartItemId) => {
    setSelectedProductCartId(productsId);
    setSelectedCartItem(cartItemId);
  };

  const handleOrderSuccess = (productsId, cartItemId) => {
    // Menghapus item dari keranjang state lokal
    console.log("Before removal:", cartItems);
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== cartItemId));
    console.log("After removal:", cartItems);

    const token = localStorage.getItem("token");
    axios.delete(`https://admin.galoostore.com/api/productcarts/remove/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to remove item from cart.");
        }
      })
      .catch(error => {
        console.error("Error removing item from cart:", error);
      });
  };


  return (
    <div className='md:flex md:pt-32 pt-32 md:w-3/4 mx-auto md:h-[40rem] h-[80rem] md:space-x-5 font-["poppins"]'>
      <div className="md:w-2/3 h-[30rem]  overflow-y-scroll bg-white shadow-xl p-5">
        <ProductCartAPI cartItems={cartItems} onProductCartSelect={handleProductCartSelect} />
      </div>
      <div className="md:w-1/3  bg-white shadow-xl p-5">
        <Order productsId={selectedProductCartId} cartItemId={selectedCartItem} onOrderSuccess={handleOrderSuccess} />
      </div>
    </div>
  );
};

export default Layout;
