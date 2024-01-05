import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Order = ({ productsId, cartItemId, onOrderSuccess }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    delivery_address: "",
    phone_number: "",
    city: "",
    payment_image: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      payment_image: file,
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const { delivery_address, phone_number, city, payment_image } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append("delivery_address", delivery_address);
    formDataToSend.append("phone_number", phone_number);
    formDataToSend.append("city", city);
    formDataToSend.append("payment_image", payment_image);

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      // Token telah kedaluwarsa, tampilkan pesan dan arahkan ke halaman login
      setErrorMessage("Sesi Anda telah habis, harap login kembali.");
      setSuccessMessage("");
      setIsLoading(false);
      return;
    }

    axios.post(
      `https://admin.galoostore.com/api/orders/${productsId}/${cartItemId}`,
      formDataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          setErrorMessage("");
          setSuccessMessage("Order submitted successfully!");
          onOrderSuccess(productsId, cartItemId);
          navigate("/order-history");
        } else {
          throw new Error("Failed to submit order.");
        }
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        setErrorMessage("Failed to submit order. Please try again.");
        setSuccessMessage("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div>
        <p>
          ProductCart ID yang dipilih: {cartItemId} dan {productsId}
        </p>
      </div>
      <div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && (
          <p className="bg-green-200 text-green-800 p-2 mb-4 rounded">
            {successMessage}
          </p>
        )}
      </div>
      <div>
        <label>Alamat Pengiriman:</label>
        <input
          type="text"
          placeholder="Nama Jalan, Gedung, No.Rumah"
          className="border-[#006F2B] p-2 w-full rounded-md h-10 border-2"
          name="delivery_address"
          value={formData.delivery_address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Nomor HP</label>
        <input
          type="text"
          placeholder="Nomor Telepon"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          className="border-[#006F2B] p-2 w-full rounded-md h-10 border-2"
        />
      </div>
      <div>
        <label>Kota</label>
        <input
          placeholder="Provinsi, Kota, Kecamatan, Kode Pos"
          className="border-[#006F2B] p-2 w-full rounded-md h-10 border-2"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
     
      {isLoading ? (
        <div className="flex pt-5 items-center justify-center text-[#13A89E]">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      ) : (
        <>
          <button
            className="w-2/3 mx-auto flex rounded-md text-center justify-center bg-[#006F2B] text-white mt-5 py-3"
            onClick={handleSubmit}
          >
            Submit Order
          </button>
        </>
      )}
    </div>
  );
};

export default Order;
