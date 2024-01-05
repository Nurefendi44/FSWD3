import React, { useState, useEffect } from 'react';
import { FaStar, FaTimes } from 'react-icons/fa'; // Mengimpor ikon bintang dan ikon silang dari react-icons

const UlasanProduct = ({ idProduct }) => {
    const [reviews, setReviews] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const apiUrl = 'https://admin.galoostore.com/api/reviews';
    const productId = idProduct;

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data.data);
            })
            .catch((error) => {
                console.error('Error fetching reviews: ', error);
            });
    }, []);

    const productReviews = reviews.filter((review) => review.products_id === productId);

    const renderRatingStars = (rating) => {
        const starCount = parseInt(rating);
        const stars = [];

        for (let i = 0; i < starCount; i++) {
            stars.push(<FaStar key={i} color="#006F2B" />);
        }

        return stars;
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    const openImageModal = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className='border rounded-xl  p-10 h-full mt-10 font-[Montserrat] shadow-xl'>
            <h1 className='text-2xl'>Ulasan Produk</h1>
            {productReviews.length > 0 ? (
                <ul>
                    {productReviews.map((review) => (
                        <li key={review.id}>
                            <p className='text-[20px] mt-2'>{review.reviewer_name}</p>
                            <p className='flex mt-2'>{renderRatingStars(review.reviewer_rating)} </p>
                            <div className='flex my-2 space-x-5 text-[#929191]   '>
                                <p>{formatDate(review.created_at)}</p>
                                {/* <p>{variant}</p> */}
                            </div>
                            <p>{review.reviewer_comments}</p>
                            <img
                                src={review.reviewer_image}
                                alt={`Reviewer ${review.reviewer_name}`}
                                onClick={() => openImageModal(review.reviewer_image)}
                                style={{ cursor: 'pointer' }}
                                className='rounded-lg w-20 mt-2 h-20'
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Belum ada ulasan untuk produk</p>
            )}

            {selectedImage && (
                <div className='fixed top-0  left-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-70'>
                    <img
                        src={selectedImage}
                        alt='Review'
                        className='md:max-w-screen-xl max-h-screen'
                    />
                    <div className=' md:top-48 top-60 p-3 border   rounded-full  absolute text-white cursor-pointer'>
                        <FaTimes
                            className='text-xl'
                            onClick={closeImageModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default UlasanProduct;
