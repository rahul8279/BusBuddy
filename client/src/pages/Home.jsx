import React from "react";
import Header from "../components/Header";
import { IoIosSearch } from "react-icons/io";
// import bgimage from "../assets/bgimage.jpg"

const routes = [
  "Rishikesh to dehradun",
  "dehradun to delhi",
  "Rishikesh to dehradun",
  "dehradun to delhi",
 
];

function Home() {
  return (
    <div className="h-screen w-screen bg-[url('src/assets/bgimage.jpg')] bg-cover ">
      <div className="h-full w-[85%] m-auto  ">
        <Header />
        <div className="flex flex-col justify-evenly items-center">
          <div className=" w-[70%] md:h-[20%] md:w-[40%] flex flex-col items-center gap-6 ">
            <h1 className=" text-2xl md:text-5xl text-gray-800 font-bold text-center text-shadow-2xs">
              Your Bus, Your Time, Tracked{" "}
            </h1>
            <p className=" hidden text-[#556275] text-xl md:flex text-center">
              Designed for daily commuters, it ensures reliable, accurate, and
              efficient public transport navigation across the city.
            </p>
          </div>
        </div>

        <div className=" w-full flex justify-center px-5 mt-10">
          <input
            type="text"
            placeholder="search the route...."
            className="w-[60%] md:w-[40%] h-12  border-none outline-none rounded-l-2xl  bg-gray-200 px-5 text-gray-400  text-xl"
          />
          <span className=" h-12 px-5  rounded-r-2xl bg-[#4E6688]  flex justify-center items-center ">
            <IoIosSearch className="text-2xl text-[#E3EEB2] font-bold" />
          </span>
        </div>

        <div className="   mt-15  px-5">
          <div className="flex gap-2 justify-center items-center  flex-wrap h-full w-full">
            {routes.map((data, index) => (
              <div key={index} className="w-fit flex flex-col p-3 h-40  rounded-2xl gap-3 shadow-2xl">
                <h2 className="text-xl   font-medium text-blue-800">{data}</h2>
                <div className="flex justify-evenly  ">
                  <p className=" text-[17px]  text-blue-600 bg-blue-200 px-2 rounded-2xl">  Rishikesh</p>
                <p className=" text-[17px]  text-blue-600 bg-blue-100 px-2 rounded-2xl ">Delhi</p>
                </div>
                <p className=" bg-green-400 w-fit ml-4 rounded-2xl px-2 ">Track the location</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home