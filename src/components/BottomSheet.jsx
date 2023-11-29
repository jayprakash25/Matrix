import React from "react";
import { PiDot } from "react-icons/pi";

export default function BottomSheet() {
  const Profiles = [
    {
      image: "",
      Name: "Rahul",
      location: "Kompally",
    },
  ];

  return (
    <>
      <div className="bg-[#0e1317] shadow-3xl rounded-t-xl p-3 h-[80vh] ">
        <div className="pt-7 px-7">
          <h1 className="text-2xl font-bold text-white">Your Destination</h1>

          <div className="text-white pl-5 flex items-start flex-col justify-start mt-10 gap-3.5 ">
            <div className="flex items-center justify-between w-[70vw]">
              <h1 className="text-lg">Kompally</h1>
              <button className="border-[1px] px-8 py-1 rounded-lg text-sm">
                Edit
              </button>
            </div>
            <div className="font-extralight">
              <p>|</p>
              <p>|</p>
              <p>|</p>
              <p>|</p>
              <p>|</p>
              <p>|</p>
              <p>|</p>
            </div>
            <div className="flex items-center justify-between w-[70vw]">
              <p className="text-lg">Kandlakoya</p>
              <button className="border-[1px] px-8 py-1 rounded-lg text-sm">
                Edit
              </button>
            </div>
          </div>
        </div>
        {/* Display Profiles */}
      </div>
    </>
  );
}
