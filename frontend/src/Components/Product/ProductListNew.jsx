import React from "react";
import ProductNew from "./ProductNew";
import ProductCard from "./ProductCard";

const ProductListNew = ({ searchTerm, categoryFilter }) => {
  const products = ProductNew(); // Mendapatkan produk terbaru dari ProductNew

  const filteredProducts = products.filter((product) => {
    const nameMatches = product.product_name && product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatches = categoryFilter === '' || (product.category && product.category === categoryFilter);
    return nameMatches && categoryMatches;
  });

  return (
    <>
      <div className="w-full p-5 md:px-0 md:w-3/4 mx-auto">

        {filteredProducts.length === 0 ? (
          <p className="text-center font-[Poppins]">Belum ada produk terbaru tersedia saat ini</p>
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

export default ProductListNew;
