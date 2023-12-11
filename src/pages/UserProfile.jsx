import React from "react";
import { CgProfile } from "react-icons/cg";
import { LiaLessThanSolid } from "react-icons/lia";
import { MdOutlineLocalPhone } from "react-icons/md";
import { PiHouse } from "react-icons/pi";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { ImExit } from "react-icons/im";
import { BottomBar } from "../components";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const liststyle = "flex  items-center gap-10 cursor-pointer text-lg";

  return (
    <main>
      <nav className="p-4">
        <div className="flex items-center w-[55vw] justify-between">
          <div>
            <Link to={"/home"}>
              <LiaLessThanSolid size={20} color="black" />
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-lg font-semibold">My Profile</h1>
          </div>
        </div>
      </nav>

      <div className="flex items-start justify-center gap-5 mt-5">
        <div className="">
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300"
            className="object-cover w-40 h-40 rounded-full"
            alt=""
          />
        </div>
        <div className="max-w-[55vw] space-y-2">
          <h1 className="text-lg font-bold">Rahul</h1>
          <p className="text-sm text-slate-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus unde
            quisquam atque, eaque recusandae ducimus perspiciatis assumenda cum
            labore fuga.
          </p>
          <button className="py-2 text-sm font-semibold text-white bg-black rounded-lg px-7">
            Edit Profile
          </button>
        </div>
      </div>

      <ul className="flex flex-col items-start justify-start gap-10 p-8 my-3 text-sm text-center">
        <li className={"flex justify-between w-full items-center"}>
          <div className={liststyle}>
            <PiHouse size={28} color="" />
            <h1>Home</h1>
          </div>
          <div>
            <LiaGreaterThanSolid size={20} color="black" />
          </div>
        </li>
        <li className={"flex justify-between w-full items-center"}>
          <div className={liststyle}>
            <MdOutlineLocalPhone size={28} color="" />
            <h1>Contact</h1>
          </div>
          <div>
            <LiaGreaterThanSolid size={20} color="black" />
          </div>
        </li>
        <li className={"flex justify-between w-full items-center"}>
          <div className={liststyle}>
            <CgProfile size={28} color="" />
            <h1>Profile</h1>
          </div>
          <div>
            <LiaGreaterThanSolid size={20} color="black" />
          </div>
        </li>
        <li className={"flex justify-between w-full items-center"}>
          <div className={liststyle}>
            <ImExit size={28} color="" />
            <h1 className="text-red-500">Logout</h1>
          </div>
          <div>
            <LiaGreaterThanSolid size={20} color="black" />
          </div>
        </li>
        <li className={"flex justify-between w-full items-center"}>
          <div className={liststyle}>
            <ImExit size={28} color="" />
            <h1 className="text-red-500">Logout</h1>
          </div>
          <div>
            <LiaGreaterThanSolid size={20} color="black" />
          </div>
        </li>
      </ul>
      <BottomBar />
    </main>
  );
}
