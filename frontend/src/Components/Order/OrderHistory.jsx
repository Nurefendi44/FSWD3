import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Pending"); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://admin.galoostore.com/api/orders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        const formattedOrders = data.map((order) => ({
          id: order.id,
          products_id: order.products_id,
          products_name: order.products_name,
          visitors_name: order.visitors_name,
          products_image: order.products_image,
          delivery_address: order.delivery_address,
          variant: order.variant,
          quantity: order.quantity,
          total_price: order.total_price,
          price: order.price,
          order_status: order.order_status, 
        }));
        
        setOrders(formattedOrders);
        
        setFilteredOrders(
          formattedOrders.filter((order) => order.order_status === "Pending")
        );
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, [navigate]);

 
  const handleTabChange = (status) => {
    setActiveTab(status);
    setFilteredOrders(orders.filter((order) => order.order_status === status));
  };
  const handleCompleteOrder = (productId , orderId) => {
    
    navigate(`/ulasan/${productId}/${orderId}`);
  };
  const adminPhoneNumber = "6282257626491";

  return (
    <div className="container mx-auto mt-8 w-3/4 font-['Poppins'] ">
      <div className="flex bg-white shadow-lg p-4 justify-between mx-auto mb-4 text-[#006F2B]">
        <div
          className={`font-semibold cursor-pointer mr-4 ${activeTab === "Pending" ? "text-[#006F2B]" : "text-black"
            }`}
          onClick={() => handleTabChange("Pending")}
        >
          Belum Bayar
        </div>
        <div
          className={`font-semibold cursor-pointer mr-4 ${activeTab === "Processing" ? "text-[#006F2B]" : "text-black"
            }`}
          onClick={() => handleTabChange("Processing")}
        >
          Dikirim
        </div>
        <div
          className={`font-semibold  cursor-pointer ${activeTab === "Complete" ? "text-[#006F2B]" : "text-black"
            }`}
          onClick={() => handleTabChange("Complete")}
        >
          Selesai
        </div>
      </div>

      <div className=" gap-4">
        {filteredOrders.map((order, index) => (
          <div key={index} className="bg-white shadow-xl p-4 rounded-lg">
            <h3 className="text-lg text-[#006F2B] mb-2 border-b-2">
              {order.products_name}
            </h3>
            <div className="flex justify-between items-center pb-2 border-b-2 ">
              <div className="flex items-center md:space-x-10">
                <img className="w-32" src={order.products_image} alt="" />
                <div className="">
                  <p>
                    <strong>Varian:</strong> {order.variant}
                  </p>
                  <p className="block">x{order.quantity}</p>
                  <p className="text-[#006F2B] block md:hidden ">Rp{order.price}</p>
                </div>

              </div>
              <p className="text-[#006F2B] hidden md:block ">Rp{order.price}</p>
            </div>
            <div className=" flex justify-end py-5">
              <p className=" font-semibold ">Jumlah yang harus dibayar: <span className="text-[#006F2B]">Rp{order.total_price}</span> </p>
            </div>


            {order.order_status === "Pending" && (
              <p className="flex  md:justify-end justify-center ">

                <a
                  href={`https://wa.me/${adminPhoneNumber}?text=Saya ingin mengkonfirmasi pembayaran dengan rincian sebagai berikut:%0A%0ANama Pemesan: ${order.visitors_name}%0A%0ANama Produk: ${order.products_name.replace('&', '%26')}%0AVarian: ${order.variant}%0AKuantitas: ${order.quantity}%0ATotal Harga: Rp${order.total_price}%0AAlamat Pengiriman: ${order.delivery_address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#76CA71] px-5 py-2 text-white"
                >
                  Bayar Sekarang
                </a>
              </p>
            )}
            {order.order_status === "Complete" && (
              <p>
                <button
                   className="bg-[#76CA71] px-5 py-2 text-white "
                  onClick={() => handleCompleteOrder(order.products_id, order.id)}
                >
                  Review Product
                </button>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
