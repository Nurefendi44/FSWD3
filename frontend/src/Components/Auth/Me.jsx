import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserData from "./useUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function formatDate(inputDate) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(inputDate).toLocaleDateString("id-ID", options);
}

const Me = () => {
  const { userData, tokenExp } = useUserData();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

  if (loading) {
    return (
      <div className="flex pt-5 items-center justify-center text-[#13A89E]">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white">
        <img src="/img/header.svg" alt="" />
      </div>
      <div className="-mt-16 ">
        <img src="/img/user.svg" className="" alt="" />
      </div>
      <div className="p-5">
        <p>{userData.name}</p>
        <p>Bergabung Sejak: {formatDate(userData.created_at)}</p>
      </div>
    </div>
  );
};

export default Me;
