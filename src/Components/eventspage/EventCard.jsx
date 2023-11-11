import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { PiShareFatFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

export default function EventCard() {
  return (
    <>
      <div className="flex flex-col gap-5  border-[0.1px] border-gray-300 rounded-xl p-5 cursor-pointer">
        <div className="space-y-2.5">
          <img
            src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300"
            alt=""
            className="w-[80vw] rounded-lg"
          />
          <div className="flex items-center justify-between ">
            <h1 className="text-xl font-bold font-xl">Carnival Night Fest.</h1>
            <AiOutlineHeart size="22" color="gray" />
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col space-y-3 ">
            <div className="flex items-center gap-x-3">
              <SlCalender size="18" color="gray" />
              <h1 className="text-xs text-slate-500">10 March 2024</h1>
            </div>
            <div className="flex items-center gap-x-3">
              <IoLocationOutline size="18" color="gray" />
              <h1 className="text-xs text-slate-500">Kompally Hyderabad</h1>
            </div>
          </div>
          <PiShareFatFill size="18" color="gray" />
        </div>
      </div>
    </>
  );
}
