import React from "react";
import useUserData from "./useUserData";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Information = () => {
  const [loading, setLoading] = useState(true);
  const {userData, tokenExp} = useUserData();

  return (
    <div className="">
      <h1 className="bg-[#D9D9D9] py-3 px-4 font-semibold">Informasi Akun</h1>
      {userData ? (
        <div className="p-4">
          <p>
            Nama <span>: {userData.name} </span>
          </p>
          <p>
            Email <span>: {userData.email} </span>
          </p>
         
        </div>
      ) : (
        <div className="flex pt-5 items-center justify-center text-[#13A89E]">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      )}
    </div>
  );
};

export default Information;
