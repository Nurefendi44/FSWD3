import React from 'react';

const Kuantitas = ({ tersisa, selectedQuantity, setQuantity, onTambahKeranjang }) => {
  const tambahKuantitas = () => {
    if (selectedQuantity < tersisa) {
      setQuantity(selectedQuantity + 1);
    }
  };

  const kurangiKuantitas = () => {
    if (selectedQuantity > 0) {
      setQuantity(selectedQuantity - 1);
    }
  };

  const handleTambahKeranjang = () => {
    onTambahKeranjang({
      kuantitas: selectedQuantity,
     
    });
  };

  return (
    <div className="rounded-md mt-10 flex items-center space-x-6">
      <h3 className="text-md font-bold">Kuantitas</h3>
      <div className="flex items-center bg-[#E1E1E1] rounded-lg justify-center">
        <button
          className="text-black text-2xl px-2 rounded-full"
          onClick={kurangiKuantitas}
        >
          -
        </button>
        <span className="mx-4 font-bold">{selectedQuantity}</span>
        <button
          className="text-black text-2xl px-4 rounded-full"
          onClick={tambahKuantitas}
          disabled={selectedQuantity >= tersisa}
        >
          +
        </button>
      </div>
      <h1> {tersisa} tersisa</h1>
     
    </div>
  );
};

export default Kuantitas;
