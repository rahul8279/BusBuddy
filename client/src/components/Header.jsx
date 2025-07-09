import React, { useState } from "react";
import { FaBusAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { TiThMenuOutline } from "react-icons/ti";
import { FaCircleUser } from "react-icons/fa6";

function Header() {
  const [user, setuser] = useState(true);
  const [isOpen,setIsopen] = useState(false)
  return (
    <header className="p-3 py-6  ">
      <div className="flex justify-between items-center px-4 py-2 relative ">
        <div className="flex gap-1 max-w-fit">
          <h1 className=" text-2xl md:text-3xl text-[#332D56] font-bold">
            BusBuddy
          </h1>
          <FaBusAlt className=" text-2xl md:text-3xl text-[#332D56]" />
        </div>
{/*Desktop view*/}
        <div className=" hidden md:flex gap-6">
          <ul className="flex gap-6">
            <li className="text-xl px-3 py-1 ">
              <Link to="/">Home</Link>{" "}
            </li>
            <li className="text-xl px-3 py-1 ">
              <Link to="/Livemap">Livemap</Link>
            </li>
            <li className="text-xl px-3 py-1 ">
              <Link>Routes</Link>
            </li>
          </ul>

          {!user ? (
            <ul className="flex gap-6">
              <li className="px-3 py-1  text-xl rounded-2xl text-gray-800 ">
                <Link to="/auth">Login</Link>
              </li>
              <li className="px-3 py-1 bg-gray-200 text-xl rounded-xl text-gray-800  ">
                <Link to="/auth">Signup</Link>
              </li>
            </ul>
          ) : (
            <FaCircleUser className="h-7 w-7  mt-2" />
          )}
        </div>
        <div className="md:hidden" onClick={() => setIsopen(!isOpen)}>
          {isOpen ? <MdCancel className="w-6 h-6" /> :<TiThMenuOutline className="w-6 h-6" />}
        </div>
{/*Mobile view */}
       {
        isOpen && (
          <ul className="md:hidden py-2.5 px-3  flex flex-col justify-evenly items-center gap-2 bg-gray-200 shadow-2xl rounded-2xl absolute right-1 top-10">
            <li className="text-xl font-medium">Home</li>
            <li className="text-xl font-medium">LiveMap</li>
            <li className="text-xl font-medium">Routes</li>
            <li><FaCircleUser /></li>
          </ul>
        )
       }
      </div>
    </header>
  );
}

export default Header;
