import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center font-[Poppins] justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#006F2B]">404 - Not Found</h1>
        <p className="text-lg text-gray-600 mt-4">The page you are looking for might not exist or has been moved.</p>
      </div>
    </div>
  );
};

export default NotFound;
