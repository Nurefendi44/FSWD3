import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem('token');

    fetch('http://127.0.0.1:8000/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          throw new Error('Logout failed.');
        }
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <button onClick={handleLogout}  className="block mx-auto bg-[#006F2B] text-white w-full py-2 rounded-md mt-10">
      Logout
    </button>
  );
};

export default Logout;
