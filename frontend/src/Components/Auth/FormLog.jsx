import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const FormLog = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
    general: "",
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const errors = {};
    let isValid = true;

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setErrorMessages(errors);

    
    if (isValid) {
      fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Invalid credentials");
          }
        })
        .then((data) => {
          
          localStorage.setItem("token", data.access_token);

          
          setErrorMessages({
            email: "",
            password: "",
            general: "Login successful!",
          });

          navigate("/");
        })
        .catch((error) => {
          console.error(error);

          setErrorMessages({
            email: "",
            password: "",
            general: "Invalid credentials. Please try again.",
          });
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="md:flex md:space-x-10 px-10 md:px-5  md:w-3/4 my-auto items-center mt-28 mx-auto justify-center font-['poppins'] ">
      <div className="md:w-1/2">
        <img src="/img/headerauth.png" alt="" />
      </div>
      <div className="md:w-1/2  md:space-y-14 ">
        <h1 className="text-center text-[#006F2B] text-4xl md:text-5xl  ">Selamat Datang</h1>
        <form className="md:w-3/4 space-y-5 mx-auto" onSubmit={handleSubmit} action="">
          <div className="">
            <label htmlFor="">
              <input
                type="text"
                placeholder="Email"
                className="border-2 p-2 rounded-lg h-12 border-[#006F2B] w-full"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <span className="text-red-500">{errorMessages.email}</span>
            </label>
          </div>
          <div className="">
            <label htmlFor="">
              <input
                type="password"
                placeholder="Password"
                className="border-2 p-2 rounded-lg h-12 border-[#006F2B] w-full"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className="text-red-500">{errorMessages.password}</span>
            </label>
          </div>
          <div className="">
            <label htmlFor="">
              <input
                type="submit"
                placeholder="Submit"
                className="text-white cursor-pointer rounded-lg h-12 bg-[#76CA71] w-full"
                name="submit"
                id="submit"
              />
            </label>
          </div>
          <div className="text-center font-semibold">
            <p>Belum punya akun? <Link className="text-[#76CA71]" to="/register">Daftar sekarang!</Link> </p>
          </div>
          <div className="text-red-500">{errorMessages.general}</div>
        </form>
      </div>
    </div>
  );
};

export default FormLog;
