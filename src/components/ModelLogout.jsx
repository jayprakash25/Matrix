import React from "react";
import { RxCross2 } from "react-icons/rx";

export default function logoutmodel({ setislogout, handleLogout }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 backdrop-blur-md">
      <div className="p-4 rounded-xl bg-[#161616] w-[90vw]">
        <div className="flex justify-end">
          <RxCross2
            cursor={"pointer"}
            onClick={() => {
              setislogout(false);
            }}
            size={25}
            color={"white"}
          />
        </div>
        <div className="space-y-4 text-center">
          <p className="text-lg">Are you sure you want to Logout</p>
          <div className="border-b-[1px] border-zinc-700  "></div>
        </div>
        <div className="flex items-center justify-center gap-5 mt-4">
          <button
            className="w-[50vw] px-20 py-1.5  font-semibold bg-red-600 rounded-full "
            onClick={handleLogout}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
