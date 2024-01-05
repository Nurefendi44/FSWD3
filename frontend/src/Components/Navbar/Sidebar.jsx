import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineFoodBank } from "react-icons/md";
import { RiServerLine, RiSettings4Line } from "react-icons/ri";
import { TbBuildingCottage, TbReportAnalytics, TbSpeakerphone } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import { GiClothes } from "@react-icons/all-files/gi/GiClothes";
import { GiLipstick } from "@react-icons/all-files/gi/GiLipstick";
import { GiOutbackHat } from "@react-icons/all-files/gi/GiOutbackHat";
import { GiHoneyJar } from "@react-icons/all-files/gi/GiHoneyJar";
import { BiBuildingHouse } from "@react-icons/all-files/bi/BiBuildingHouse";
import { AiOutlineHome } from "@react-icons/all-files/ai/AiOutlineHome"
import axios from "axios";
import "./Side.css"



const Sidebar = () => {

  const getIconComponent = (iconName) => {
    switch (iconName) {
      // case "AiOutlineHome":
      //   return <AiOutlineHome size={20} />;
      case "MdOutlineFoodBank":
        return <MdOutlineFoodBank size={20} />;
      case "GiClothes":
        return <GiClothes size={20} />;
      case "GiLipstick":
        return <GiLipstick size={20} />;
      case "GiOutbackHat":
        return <GiOutbackHat size={20} />;
      case "GiHoneyJar":
        return <GiHoneyJar size={20} />;
      case "RiServerLine":
        return <RiServerLine size={20} />;
      case "TbBuildingCottage":
        return <TbBuildingCottage size={20} />;
      case "BiBuildingHouse":
        return <BiBuildingHouse size={20} />;
      case "TbSpeakerphone":
        return <TbSpeakerphone size={20} />;
      default:
        return null;
    }
  };
  const [open, setOpen] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories")
      .then((response) => response.data)
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => console.error("Error fetching categories: ", error));
  }, []);



  return (
    <section className="flex ">
      <div className="">
        <div className="">
          <div className="py- pl-4 mt-4 text-white w-fit md:w-fit text-left 5 z-50  fixed bg-[#0B4AA9] flex justify-start">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>

          <div
            className={`bg-[#0B4AA9]  z-30 py-1 h-screen fixed ${open
              ? "md:-translate-x-0 -translate-x-14 w-0 md:w-16 overscroll-none"
              : "w-64 md:w-72"
              } duration-500 text-gray-100 px-4 md:overflow-y-scroll lg:overflow-visible`}
          >
            <div className="mt-4 flex flex-col space-y-2  pt-32 md:pt-20 gap-1 relative">
              {categories && categories.map((category, i) => (
                // kode mapping disini
                <NavLink
                  activeClassName={category.path === "/" ? "active" : ""}
                  to={category.id === 10 ? "/" : `/category/${category.id}`}
                  key={category.id}
                  onClick={() => setOpen(true)}
                  className={`${category.id === 10 ? "text-white " : "" // Apply different styling to "Beranda" link
                    } group flex items-center    gap-2.5  text-md  font-medium p-2  hover:text-black hover:bg-[#C8EAC6] rounded-md`}
                >
                  <div className=" w-fit  ">{getIconComponent(category.category_icon)}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 1}00ms`,
                    }}
                    className={`whitespace-pre text-white hover:text-black text-sm font-bold     duration-500 ${open && "opacity-0 translate-x-28      overflow-hidden"
                      }`}
                  >
                    {category?.category_name}
                  </h2>
                  <h2
                    className={`${!open && "hidden"
                      } absolute left-48 bg-white mt-3 font-semibold whitespace-pre text-sm text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {category?.category_name}
                  </h2>
                </NavLink>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* <div className="fixed ml-16 z-50   bg-[#006F2B] w-full  ">
      <img
        src="http://drive.google.com/uc?id=1b5BnpC0hDTQTdZIxGk2QwmGlZrFgqdnj"
        className="w-0 md:w-44 z-40   "
        alt=""
      />
    </div> */}
    </section>
  );
};

export default Sidebar;