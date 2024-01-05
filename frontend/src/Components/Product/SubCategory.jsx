import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubCategory = ({ categoryId, onSubcategorySelect, activeSubcategoryId }) => {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const allProductsOption = {
      id: null,
      subcategory_image: '/img/all.png',
      subcategory_name: 'Semua',
      categories_id: categoryId,
    };

    // Fetch data from API based on categoryId using axios
    axios.get(`https://admin.galoostore.com/api/subcategories?categories_id=${categoryId}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error('Failed to fetch subcategories');
        }
      })
      .then((data) => {
        const filteredSubcategories = data.data.filter(
          (subcategory) => subcategory.categories_id == categoryId
        );

        setSubcategories([allProductsOption, ...filteredSubcategories]);
      })
      .catch((error) => console.error('Error fetching subcategories: ', error));
  }, [categoryId]);

  return (
    <div className='md:py-10'>
      <ul className='flex md:flex-wrap px-1 font-["poppins"]'>
        {subcategories.map((subcategory) => (
          <li className='' key={subcategory.id}>
            <a href="" className='' onClick={(event) => {
              if (subcategory.id !== null) {
                event.preventDefault();
                onSubcategorySelect(subcategory.id);
              }
            }}
              style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <img className={`relative hover:bg-[#8DC28C] hover:rounded-full    hover:p-1 md:h-14 md:w-14 h-10 w-10 ${subcategory.id === activeSubcategoryId ? 'bg-[#8DC28C] rounded-full p-2 ' : ''}`} src={subcategory.subcategory_image} alt={subcategory.name} />
              <p className='font-semibold md:w-20 w-16 text-[10px]'>{subcategory.subcategory_name}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategory;
