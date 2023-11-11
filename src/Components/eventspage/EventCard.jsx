import React from "react";
import ProfilePic from "../ProfilePic";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { PiShareFatFill } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";

export default function EventCard() {
  return (
    <>
      <div className="flex flex-col gap-5 shadow-xs shadow-gray-200 border-[0.1px] rounded-xl p-5 cursor-pointer">
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
      </div>
    </>
  );
}
