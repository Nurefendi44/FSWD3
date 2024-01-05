import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductNew = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://admin.galoostore.com/api/products')
      .then((response) => {
        const data = response.data;

        const currentDate = new Date();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(currentDate.getDate() - 7);

        const recentProducts = data.data.filter((product) => {
          const uploadDate = new Date(product.created_at);
          return uploadDate >= oneWeekAgo && uploadDate <= currentDate;
        });

        const sortedProducts = recentProducts.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

        setProducts(sortedProducts);
      })
      .catch((error) => console.error('Error fetching products: ', error));
  }, []);

  return products;
};

export default ProductNew;
