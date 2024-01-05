import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const FormReg = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    name: "",
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    first_name: "",
    last_name: "",
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const errors = {};
    let isValid = true;

    if (!formData.first_name) {
      errors.first_name = "First Name is required";
      isValid = false;
    }

    if (!formData.last_name) {
      errors.last_name = "Last Name is required";
      isValid = false;
    }

    if (!formData.name) {
      errors.name = "Name is required";
      isValid = false;
    }

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
      axios.post("http://127.0.0.1:8000/api/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          navigate('/login');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className='md:flex md:space-x-10 px-10 md:px-5  md:w-3/4 my-auto items-center mt-28 mx-auto justify-center font-["poppins"] '>
      <div className="md:w-1/2">
        <img src="/img/headerauth.png" alt="" />
      </div>
      <div className="md:w-1/2 md:space-y-10 ">
        <h1 className="text-center text-[#006F2B] text-4xl md:text-5xl ">Daftar Akun</h1>
        <form className="md:w-3/4 space-y-5 mx-auto" onSubmit={handleSubmit} action="">
          <div className="">
            <label htmlFor="">
              <input
                type="text"
                placeholder="First Name"
                className="border-2 rounded-lg h-12 border-[#006F2B] w-full p-2"
                name="first_name"
                id="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
              <span className='text-red-500'>{errorMessages.first_name}</span>
            </label>
          </div>
          <div className="">
            <label htmlFor="">
              <input
                type="text"
                placeholder="Last Name"
                className="border-2 rounded-lg h-12 border-[#006F2B] w-full p-2"
                name="last_name"
                id="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
              <span className='text-red-500'>{errorMessages.last_name}</span>
            </label>
          </div>
          <div className="">
            <label htmlFor="">
              <input
                type="text"
                placeholder="Name"
                className="border-2 rounded-lg h-12 border-[#006F2B] w-full p-2"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <span className='text-red-500'>{errorMessages.name}</span>
            </label>
          </div>
          <div className="">
            <label htmlFor="">
              <input
                type="text"
                placeholder="Email"
                className="border-2 rounded-lg h-12 border-[#006F2B] w-full p-2"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <span className='text-red-500'>{errorMessages.email}</span>
            </label>
          </div>
          <div className="">
            <label htmlFor="">
              <input
                type="password"
                placeholder="Password"
                className="border-2 rounded-lg h-12 border-[#006F2B] w-full p-2"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className='text-red-500'>{errorMessages.password}</span>
            </label>
          </div>
          <div className="">
            <label htmlFor="">
              <input
                type="submit"
                placeholder="Submit"
                className=" text-white cursor-pointer rounded-lg h-12 bg-[#76CA71] w-full"
                name="submit"
                id="submit"
              />
            </label>
          </div>
          <div className="text-center font-semibold">
            <p>Sudah terdaftar?? <Link className="text-[#76CA71]" to="/login">Login</Link> </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormReg;
