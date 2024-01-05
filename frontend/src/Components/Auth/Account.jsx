import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Information from "./Information";
import Me from "./Me";
import Orders from "./Orders";
import Reviews from "./Reviews";
import Logout from "./APILogout";



const Account = () => {
  const [activeTab, setActiveTab] = useState("Informasi Akun");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);



  const handleUserDataChange = (data) => {
    setUserData(data);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Pesanan Saya":
        return <Orders className="" />;
      case "Ulasan Saya":
        return <Reviews />;
      default:
        return <Information userData={userData} />;
    }
  };

  return (
    <div className="font-['poppins'] py-10 ">
      <div className="md:flex md:w-2/3 mx-auto ">
        <div className="md:w-1/3 relative shadow-lg rounded-md ">
          <Me onUserData={handleUserDataChange} />
          <div className="p-5 text-[#006F2B] font-semibold">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("Pesanan Saya")}
                className="block"
              >
                Pesanan Saya
              </button>
              <button
                onClick={() => setActiveTab("Informasi Akun")}
                className="block"
              >
                Informasi Akun
              </button>
              <button
                onClick={() => setActiveTab("Ulasan Saya")}
                className="block"
              >
                Ulasan Saya
              </button>
            </div>
            <Logout />
          </div>
        </div>
        <div className="md:w-2/3 border-2 h-[30rem] overflow-y-scroll">{renderContent()}</div>
      </div>
    </div>
  );
};
export default Account;
