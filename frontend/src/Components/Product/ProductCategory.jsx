import axios from 'axios';
import { useEffect, useState } from 'react';

const ProductCategory = (categoryId, subcategoryId) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://admin.galoostore.com/api/products')
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error('Failed to fetch products');
        }
      })
      .then((data) => {
        const filteredProducts = data.data.filter(
          (product) =>
            product.categories_id == categoryId && 
            (subcategoryId == categoryId || subcategoryId == null || product.subcategories_id == subcategoryId)
        );
        setProducts(filteredProducts);
      })
      .catch((error) => console.error('Error fetching products: ', error));
  }, [categoryId, subcategoryId]);

  return products;
};

export default ProductCategory;
