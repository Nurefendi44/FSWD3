import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product, categoryId }) => {
  const imageClass = categoryId == 2 ? "w-36" : "w-full";
  // const linkClass = categoryId == 2 ? "w-1/2 md:w-1/5" : "w-full mx-2 md:w-[20%]";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const userIsLoggedIn = !!token;

  const handleSubmit = (e) => {
    navigate(`/product/${product.id}`)
  }
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  return (
    <button onClick={handleSubmit} className={`mb-4 border-2 w-full hover:border-2 hover:border-[#006F2B]   bg-white shadow-lg rounded-lg `}>
      <div className="w-full  h-48 p-3 flex justify-center">
        <img
          src={product.product_image}
          className={`object-contain ${imageClass} `}
          alt={product.name}
          
        />
      </div>
      <div className="py-2 px-2 text-left font-['poppins']">
        <p className="font-semibold h-14  text-[13px]">{product.product_name}</p>
        <p className="font-semibold text-[#8DC28C] text-[14px]">{formatRupiah(product.price)}</p>
        <p>{product.star}</p>
        <p className="font-medium text-black text-[0.7rem]"> tersisa {product.stock} </p>
      </div>
    </button>
  );
};


export default ProductCard;
