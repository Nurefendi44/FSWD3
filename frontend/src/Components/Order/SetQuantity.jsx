// Kuantitas.js
import React from 'react';

const SetQuantity = ({ quantity, onPlus, onMinus }) => {
  return (
    <div className="flex items-center">
      <button onClick={onMinus} className="border p-1 rounded-l cursor-pointer">-</button>
      <span className="px-2">{quantity}</span>
      <button onClick={onPlus} className="border p-1 rounded-r cursor-pointer">+</button>
    </div>
  );
};

export default SetQuantity;
