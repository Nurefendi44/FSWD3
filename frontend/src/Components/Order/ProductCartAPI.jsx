import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import SetQuantity from './SetQuantity';
import axios from 'axios';

function formatRupiah(amount) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
}
const ProductCartAPI = ({ onProductCartSelect }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleProductClick = (productsId, cartItemId) => {
    onProductCartSelect(productsId, cartItemId);
  };

  const handleRemoveCartItem = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(`https://admin.galoostore.com/api/productcarts/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id));

        // Show successful deletion notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Item berhasil dihapus dari keranjang.');
        }
      } else {
        throw new Error("Failed to remove item from cart.");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("https://admin.galoostore.com/api/productcarts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        if (data.cartItems && Array.isArray(data.cartItems)) {
          setCartItems(data.cartItems);
        } else {
          console.error("Invalid data format received from API.");
        }
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
      });
  }, []);

  const handlePlusQuantity = async (cartItemId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(`https://admin.galoostore.com/api/productcarts/plus/${cartItemId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === cartItemId) {
            const updatedQuantity = parseInt(item.quantity, 10) + 1;
            const updatedTotalPrice = updatedQuantity * item.price;
            return { ...item, quantity: updatedQuantity, total_price: updatedTotalPrice };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      } else {
        throw new Error("Failed to update item quantity.");
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const handleMinusQuantity = async (cartItemId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(`https://admin.galoostore.com/api/productcarts/minus/${cartItemId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === cartItemId && item.quantity > 1) {
            const updatedQuantity = item.quantity - 1;
            const updatedTotalPrice = updatedQuantity * item.price;
            return { ...item, quantity: updatedQuantity, total_price: updatedTotalPrice };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      } else {
        throw new Error("Failed to update item quantity.");
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  return (
    <div>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-1 py-2">Pilih</th>
            <th className="px-4 py-2">Produk</th>
            <th className="px-4 py-2">Kuantitas</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem) => (
            <tr key={cartItem.id}>
              <td><input type='checkbox' onClick={() => handleProductClick(cartItem.products_id, cartItem.id)} /></td>
              <td className="px-4 py-2">
                <div className='md:flex md:space-x-2'>
                  <img src={cartItem.products_image} alt={cartItem.products_name} className='w-28 h-28 object-contain' />
                  <div>
                    <p className='text-[#006F2B] font-semibold'>{cartItem.products_name}</p>
                    <p>{cartItem.variant}</p>
                    <p>{formatRupiah(cartItem.price)}</p>
                    <p className='text-[#8DC28C]'>Total Harga: {formatRupiah(cartItem.total_price)},-</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <SetQuantity
                  quantity={cartItem.quantity}
                  onPlus={() => handlePlusQuantity(cartItem.id)}
                  onMinus={() => handleMinusQuantity(cartItem.id)}
                />
              </td>
              <td className="px-4 py-2">
                <FaTrash onClick={() => handleRemoveCartItem(cartItem.id)} className='text-[#006F2B]' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCartAPI;
