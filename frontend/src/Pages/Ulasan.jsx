import React from 'react'
import PostReview from '../Components/Order/PostReview'
import Navbar from '../Components/Navbar/Navbar'
import garis from "../Components/img/garis.png"
const Ulasan = () => {
  return (
    <div>
        <div>
            <Navbar />
            <div className='pt-32 text-center justify-center text-5xl font-[Poppins] font-semibold mx-auto'>
                <h1 className='text-center text-'>Review</h1>
                <img className='flex mx-auto' src={garis} alt="" />
            </div>
            <h1 className='font-[Montserrat] text-center mt-10'>Berikan ulasan anda mengenai produk kami :</h1>
        <PostReview/>
        </div>
    </div>
  )
}

export default Ulasan
