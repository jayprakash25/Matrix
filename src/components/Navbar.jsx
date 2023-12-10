import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

export default function Navbar() {
  const [isshow, setisshow] = useState();

  return (
    <nav className="overflow-y-scroll ">
      <div className="flex justify-between pt-5 px-9">
        <div>
          <h1 className="text-xl font-semibold">Vvibe</h1>
        </div>
        <div>
          <CiMenuFries
            size={25}
            onClick={() => {
              setisshow(true);
            }}
            className={`${isshow ? "hidden" : "block"}  cursor-pointer`}
            color="black"
          />
        </div>
      </div>
      <div
        className={` ${
          isshow ? "block" : "hidden"
        } flex justify-end -mt-12 duration-500 ease-in-out bg-black bg-opacity-70 backdrop-blur-sm`}
      >
        <aside className="h-screen bg-gray-50  w-[60vw] pl-7 pt-5">
          <div className="flex justify-end pr-10">
            <RxCross2
              cursor={"pointer"}
              onClick={() => {
                setisshow(false);
              }}
              size={28}
            />
          </div>
          <div className="space-y-3">
            <div>
              <img
                src="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=300"
                className="object-cover rounded-full w-28 h-28"
                alt=""
              />
            </div>
            <div className="space-y-3">
              <h1 className="text-xl font-bold">Rahul</h1>
              <p className="text-sm text-slate-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                sed.Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Modi, sed
              </p>
            </div>
          </div>
          <ul className="font-semibold mt-7 space-y-7">
            <li className="cursor-pointer text-slate-700">Home</li>
            <li className="cursor-pointer text-slate-700">About</li>
            <li className="cursor-pointer text-slate-700">Contact us</li>
            <li className="cursor-pointer text-slate-700">Notifications</li>
            <li className="cursor-pointer text-slate-700">Profile</li>
            <li className="text-red-500 cursor-pointer">Login Out</li>
          </ul>
        </aside>
      </div>
    </nav>
  );
}
