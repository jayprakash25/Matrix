import React, { useState } from "react";
import { IoMdArrowBack, IoMdHelp, IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { MdSecurity, MdOutlinePrivacyTip } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { signOut } from "firebase/auth";
import ModelLogout from "../components/ModelLogout";
import EditProfile from "./EditProfile";
export default function SideBar() {
  const [islogout, setislogout] = useState(false);
  const [isedit, setisedit] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <aside>
        <div className="flex justify-between p-5">
          <h1 className="text-lg font-semibold">Menu</h1>
          <Link to={`/profile`}>
            <IoMdArrowBack size={28} color="white" />
          </Link>
        </div>
        <ul className="px-6 mt-16 space-y-5">
          <li className="flex items-center p-3 cursor-pointer gap-7 active:bg-zinc-800">
            <IoMdHelp size={30} color="white" />
            <h1>Help</h1>
          </li>
          <li className="flex items-center p-3 cursor-pointer gap-7 active:bg-zinc-800">
            <MdSecurity size={30} color="white" />
            <h1>Security</h1>
          </li>
          <li
            onClick={() => {
              setisedit(true);
            }}
            className="flex items-center p-3 cursor-pointer gap-7 active:bg-zinc-800"
          >
            <FaRegEdit size={30} color="white" />
            <h1>Edit Profile</h1>
          </li>
          <li className="flex items-center p-3 cursor-pointer gap-7 active:bg-zinc-800">
            <MdOutlinePrivacyTip size={30} color="white" />
            <h1>Privacy & Policy</h1>
          </li>
          <li
            onClick={() => {
              setislogout(true);
            }}
            className="flex items-center p-3 cursor-pointer gap-7 active:bg-zinc-800"
          >
            <IoIosLogOut size={30} color="red" />
            <h1 className="text-red-500">Logout</h1>
          </li>
        </ul>
      </aside>
      {islogout ? (
        <ModelLogout setislogout={setislogout} handleLogout={handleLogout} />
      ) : null}
      {isedit ? <EditProfile setisedit={setisedit} /> : null}
    </>
  );
}
