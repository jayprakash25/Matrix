import React from "react";
import ProfilePic from "../ProfilePic";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { PiShareFatFill } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";

export default function EventCard() {
  return (
    <div className="flex flex-col gap-5 shadow-xs shadow-gray-200 border-[0.1px] rounded-md p-5 cursor-pointer">
      <div className="flex justify-between items-start">
        <div className="flex justify-start items-start gap-5">
          <ProfilePic />
          <div className="space-y-1">
            <h1 className="text-lg font-semibold">Rahul</h1>
            <div className="flex items-center gap-2">
              <IoLocationOutline size="20" color="gray" />
              <p className="text-sm text-gray-500">Hyderabad</p>
            </div>
          </div>
        </div>
        <BsThreeDots size="20" color="gray" />
      </div>
      <div>
        <img
          src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300"
          alt=""
          className="w-[80vw] rounded-lg"
        />
      </div>
      <div className="flex items-center justify-start gap-5">
        <AiOutlineHeart size="22" color="gray" />
        <PiShareFatFill size="22" color="gray" />
      </div>
    </div>
  );
}
