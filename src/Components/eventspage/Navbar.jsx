import React from "react";
import { ProfilePic } from "../index";
import { IoArrowBackOutline } from "react-icons/io5";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b-[1px] border-gray-300">
      <IoArrowBackOutline cursor={"pointer"} size="25" color="black" />
      <div>
        <h1 className="font-semibold text-lg">Events</h1>
      </div>
      <ProfilePic />
    </nav>
  );
}
