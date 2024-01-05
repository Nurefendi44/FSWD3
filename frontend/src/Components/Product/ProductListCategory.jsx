import { useParams } from 'react-router-dom';
import SubCategory from './SubCategory';
import ProductCategory from './ProductCategory';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductListCategory = () => {
  const { categoryId } = useParams();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const products = ProductCategory(parseInt(categoryId), selectedSubcategory);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState(null);

  const handleSubcategorySelect = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    setActiveSubcategoryId(subcategoryId);
  };

  useEffect(() => {
    setSelectedSubcategory(null);
  }, [categoryId]);

  return (
    <div className='w-full p-3   md:w-3/4 mx-auto'>
      <div className="pt-5 md:pt-3  ">
        {/* <h1>Products in Category: {categoryId}</h1> */}
        <SubCategory
          categoryId={parseInt(categoryId)}
          onSubcategorySelect={handleSubcategorySelect}
          activeSubcategoryId={activeSubcategoryId}
        />
      </div>
      <div className="grid grid-cols-2 pt-5 md:grid-cols-5 gap-3 ">
        {products.map((product) => (
          <div className='flex  w-full ' key={product.id}>
            <ProductCard key={product.id} product={product} categoryId={categoryId} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListCategory;
