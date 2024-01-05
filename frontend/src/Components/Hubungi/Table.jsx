/** @format */

import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import wa from "./whatssapp.png";
const Table = () => {
  return (
    <>
      <div className='block'>
        <div className=''>
          <p className='md:text-xl px-6 md:px-10'>
            Koperasi SAHAJA menyediakan produk dan usaha:{" "}
          </p>
          <ul>
            <div className='px-6 font-[Poppins] mt-4 md:text-xl   '>
              <div className='flex'>
                <div className='mt-1'>
                  <AiOutlineRight className="text-[#006D33]"/>
                </div>
                <li className='flex'> Franchise Galoo galoo drink </li>
              </div>

              <div className='font-[Poppins] mt-4'>
                <div className='flex'>
                  <div className='mt-1'>
                    <AiOutlineRight className="text-[#006D33]" />
                  </div>
                  <li className='flex'> Madu murni dengan 2 kualitas</li>
                </div>
              </div>
              <div className='font-[Poppins] mt-4'>
                <div className='flex'>
                  <div className='mt-1'>
                    <AiOutlineRight className="text-[#006D33]" />
                  </div>
                  <li className='flex'> Cafe Galoo galoo House </li>
                </div>
              </div>
              <div className='font-[Poppins] mt-4'>
                <div className='flex'>
                  <div className='mt-1'>
                    <AiOutlineRight className="text-[#006D33]" />
                  </div>
                  <li className='flex'> Honey House (Toko Madu) </li>
                </div>
              </div>
              <div className='font-[Poppins] mt-4'>
                <div className='flex'>
                  <div className='mt-1'>
                    <AiOutlineRight className="text-[#006D33]" />
                  </div>
                  <li className='flex'> Galoo galoo Mart (Swalayan) </li>
                </div>
              </div>
              <div className='font-[Poppins] mt-4'>
                <div className='flex'>
                  <div className='mt-1'>
                    <AiOutlineRight className="text-[#006D33]" />
                  </div>
                  <li className='flex'>
                    {" "}
                    Eduwisata Galoo galoo Land di HPPB UNAND{" "}
                  </li>
                </div>
              </div>
            </div>
          </ul>
          <div className='mt-5 hover:text-[#D9D9D9] w-fit ml-10 '>
            <a href='https://wa.me/082386766267' target='_blank'>
              {" "}
              <button className=' btn rounded-2xl p-3 flex bg-[#D9D9D9]   hover:bg-[#006D33] shadow-xl '>
                <img src={wa} width='50' alt='' />
                <h1 className=' mt-3 m-2  '>Hubungi kami via WhatsApp</h1>
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Table;
