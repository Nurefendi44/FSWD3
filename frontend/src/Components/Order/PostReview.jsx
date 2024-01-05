import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import { AiOutlinePicture } from 'react-icons/ai';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostReview = () => {
  const navigate = useNavigate();
  const [uploadedFileName, setUploadedFileName] = useState('');
  const { productId, orderId } = useParams();
  const [formData, setFormData] = useState({
    reviewer_image: null,
    reviewer_comments: '',
    reviewer_rating: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleRatingChange = (newRating) => {
    setFormData({
      ...formData,
      reviewer_rating: newRating,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFileName('Gambar berhasil di Unggah');
    setFormData({
      ...formData,
      reviewer_image: file,
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);

    const apiUrl = `https://admin.galoostore.com/api/postreviews/${productId}/${orderId}`;

    const formDataToSend = new FormData();
    formDataToSend.append('reviewer_image', formData.reviewer_image);
    formDataToSend.append('reviewer_comments', formData.reviewer_comments);
    formDataToSend.append('reviewer_rating', formData.reviewer_rating);

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSend,
    })
      .then((response) => {
        if (response.ok) {
          navigate('/');
          console.log('Review submitted successfully!');
          alert('Ulasan Berhasil diUpload');
        } else {
          console.error('Failed to submit review.');
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error occurred while submitting review:', error);
        setIsLoading(false);
      });
  };

  return (
    <div className='md:w-3/4 p-5 font-[Poppins] mx-auto shadow-md'>
      <div className=''>
        <h1 htmlFor="reviewComments">Deskripsi</h1>
        <textarea
          className='border rounded-xl w-full h-20 p-2'
          id="reviewComments"
          name="reviewer_comments" // Atribut name untuk input teks
          value={formData.reviewer_comments}
          onChange={(e) => setFormData({ ...formData, reviewer_comments: e.target.value })}
        />
      </div>
      <div className='mt-10'>
        <h1>Unggah Gambar</h1>
        <label
          htmlFor="reviewImage"
          className='inline-block w-1/2 px-4 py-2 bg-gray-200 border border-dashed border-gray-400 rounded-lg text-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-300'
        >
          <AiOutlinePicture className='rounded-md text-2xl flex mx-auto text-[#9CA1AD]' />
          {uploadedFileName ? uploadedFileName : 'Tambahkan Foto'}
        </label>
        <input
          type="file"
          id="reviewImage"
          name="reviewer_image"
          className='hidden'
          onChange={handleFileChange}
        />
      </div>

      <div className='flex items-center my-auto space-x-8 mt-10'>
        <label>Kualitas Produk:</label>
        <StarRating rating={formData.reviewer_rating} onRatingChange={handleRatingChange} />
      </div>
      <div className='flex space-x-2'>
        {isLoading ? (
          <div className="flex pt-5 items-center justify-center text-[#13A89E]">
            <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          </div>
        ) : (
          <>
            <button className='bg-[#006F2B] p-2 text-white rounded-xl mt-10' onClick={handleSubmit}>
              Kirim Ulasan
            </button>
            <Link className='bg-[#006F2B] p-2 text-white rounded-xl mt-10' to='/profile'>
              Cancel
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default PostReview;
