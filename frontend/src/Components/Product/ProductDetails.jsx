import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import UlasanProduct from "./UlasanProduct";
import { FaShoppingCart } from 'react-icons/fa';
import Kuantitas from "../Kuantitas/Kuantitas";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "./Product.css"
const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selectedVariant, setSelectedVariant] = useState('');
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleTambahKeranjang = async (data) => {

    const userIsLoggedIn = !!token;

    if (!userIsLoggedIn) {
      navigate(`/login`);
      return;
    }

    const apiUrl = `https://admin.galoostore.com/api/productcarts/${productId}`;
    const requestData = {
      quantity: data.kuantitas,
      variant: selectedVariant,
      products_id: productId,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (userIsLoggedIn === false) {
        navigate('/login');
      }else if (requestData ===null){
        alert("Silahkan Masukkan Data Terlebih Dahulu")
      } else if (response.status === 200 && userIsLoggedIn === true) {
        navigate('/product-cart');
      } else {
        navigate('/login');
        console.error("Gagal menambahkan produk ke keranjang.");
      }
    } catch (error) {
      console.error("Error menambahkan produk ke keranjang: ", error);
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://admin.galoostore.com/api/products/${productId}`);
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching product: ", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  const ProductDescription = () => {
    if (loading) return
    <div className="flex pt-5 items-center justify-center text-[#13A89E]">
      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
    </div>;
    if (!product) return <div>Product not found.</div>;
    const variant = product.variant;
    const variants = variant.split(',').map((option) => option.trim());
    const uniqueVariants = [...new Set(variants)];

    return (
      <div className="font-[Poppins]">
        <h1 className="font-bold md:text-[20px] text-[14px]">{product.product_name}</h1>
        <h1>{product.star}</h1>
        <p className="text-[#006F2B] mt-10 font-bold">{formatRupiah(product.price)}</p>
        <p className="mt-10 font-bold">Variant:
          <select
            className="p-1 rounded-md ml-10 font-[Poppins] border"
            name="variant"
            id="" value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}>
            <option >pilih Varian</option>
            {uniqueVariants.map((option, index) => (
              <>
                <option className="font-bold font-[Poppins]" key={index} value={option}>{option}</option>
              </>

            ))}
          </select></p>
        <Kuantitas tersisa={product.stock} selectedQuantity={selectedQuantity} setQuantity={setSelectedQuantity} onTambahKeranjang={handleTambahKeranjang} />

      </div >
    );
  };

  const SpesifikasiProduk = () => {
    if (loading) return <div className="flex pt-5 items-center justify-center text-[#13A89E]">
      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
    </div>;
    if (!product) return <div>Product not found.</div>;

    return (
      <div className="border pb-10 rounded-xl h-full mt-10 font-[Montserrat] shadow-xl">
        <div className="bg-[#E1E1E1] lg:px-10 p-2 w-[95%] mx-auto rounded-md py-2 my-5 md:h-14 h-12">
          <h1 className="my-auto md:text-[25px] text-[17px]">Spesifikasi Produk</h1>
        </div>
        <div className="lg:w-[95%] mx-auto">
          <h1 className="mx-auto p-4 font-[Poppins]">
            <div dangerouslySetInnerHTML={{ __html: product.specification }} />
          </h1>
        </div>
        <div className="bg-[#E1E1E1] lg:px-10 p-2 w-[95%] rounded-md mx-auto py-2 my-5 md:h-14 h-12">
          <h1 className="my-auto md:text-[25px] text-[17px]">Deskripsi Produk</h1>
        </div>
        <div className="w-[95%] mx-auto">
          <h1 className="font-[Poppins]">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </h1>
        </div>
      </div>
    );
  };

  if (!product) return <div>.</div>;
  return (
    <div className="lg:w-3/4 w-5/6 mx-auto pt-32">
      <div className="border lg:mt-10 font-[Poppins] shadow-xl rounded-md">
        <div className="md:flex justify-center lg:space-x-20">
          <div className="md:w-1/3 h-30rem] p-2">
            <Carousel showThumbs={true} showArrows={false} showStatus={false} showIndicators={false}>
              <div >
                <img src={product.product_image} alt="Product Main" />
              </div>
              <div>
                <img src={product.product_image2} alt="Product Image 2" />
              </div>
              <div>
                <img src={product.product_image3} alt="Product Image 3" />
              </div>
            </Carousel>
          </div>
          <div className="lg:w-1/2 p-3">
            <ProductDescription />
            <button
              onClick={() => handleTambahKeranjang({ kuantitas: selectedQuantity, product })}
              className="items-center space-x-3 rounded-lg mt-10 hover:bg-[#def9dd]  text-[#006F2B] mx-auto md:mx-0 flex bg-[#C8EAC6] p-2"
            >
              <FaShoppingCart />
              <h1 className="font-bold">Masukkan Keranjang</h1>
            </button>
          </div>
        </div>
      </div>
      <SpesifikasiProduk />
      <UlasanProduct idProduct={productId} />
    </div>
  );
};

export default ProductDetails;
