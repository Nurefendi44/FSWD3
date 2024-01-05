import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Slider from "../Header/Slider";
import axios from "axios";
import "../../App.css";
import Lebah from "../img/lebah.png";

const Allproduct = ({ search, filter }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://admin.galoostore.com/api/products')
            .then((response) => {
                const data = response.data;
                setProducts(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products: ', error);
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter((product) => {
        const nameMatches = product.product_name && product.product_name.toLowerCase().includes(search.toLowerCase());
        const categoryMatches = filter === '' || (product.category && product.category === filter);
        return nameMatches && categoryMatches;
    });

    return (
        <>
            <Slider />
            <div className='bg-[#C8EAC6] w-3/4 mx-auto h-14 rounded-md mt-10'>
                <h1 className='text-center text-[#006F2B] font-[Poppins] text-xl font-bold items-center py-4  '>Semua Produk</h1>
            </div>
            <div className="w-full p-5 md:px-0 md:w-3/4 mx-auto">
                {loading ? (
                    <div className="fixed bg-white top-0 left-0 w-full h-full flex items-center justify-center z-50">
                        <img src={Lebah} width={150} className="animate-bee" alt="Lebah" />
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <p className="text-center font-[Poppins]">Belum ada produk</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 ">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Allproduct;
