import React from "react";
import { FaBusAlt } from "react-icons/fa";

function Header() {
  return (
    <header className="p-3 py-6  ">
      <div className="flex justify-between items-center px-4 py-2 ">
        <div className="flex gap-1 max-w-fit">
          <h1 className="text-3xl text-[#332D56] font-bold">BusBuddy</h1>
          <FaBusAlt className="text-3xl text-[#332D56]" />
        </div>
        <div className="h-[50px] w-[50px] bg-black rounded-full">
             
        </div>
      </div>
    </header>
  );
}

export default Header;