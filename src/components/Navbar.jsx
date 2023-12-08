import React from "react";
import { CiMenuFries } from "react-icons/ci";

export default function Navbar() {
  return (
    <nav className="overflow-y-scroll">
      <div className="flex justify-between pt-5 px-9">
        <div>
          <h1 className="text-xl font-semibold">Vvibe</h1>
        </div>
        <div>
          <CiMenuFries
            size={25}
            className="hidden cursor-pointer"
            color="black"
          />
        </div>
      </div>

      <div className="flex justify-end -mt-12 duration-500 ease-in-out bg-black bg-opacity-70 backdrop-blur-sm">
        <aside className="h-screen bg-gray-50  w-[60vw] pl-10 pt-7">
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
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                sed.Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                sed
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-5 font-semibold">
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
          </ul>
        </aside>
      </div>
    </nav>
  );
}
