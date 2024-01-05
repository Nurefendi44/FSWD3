import React from 'react'
import OrderHistory from "../Order/OrderHistory";


const Orders = () => {
  return (
    <div className="">
    <h1 className="bg-[#D9D9D9] py-3 px-4 font-semibold">Pesanan Saya</h1>
    <div className="p-4  ">
    <OrderHistory/>
    </div>
  </div>
  )
}

export default Orders