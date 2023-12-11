import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function EditProfile({ setisedit }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 backdrop-blur-md">
      <div className="p-6  bg-white rounded-md w-[85vw]">
        <div className="flex justify-end">
          <RxCross2
            cursor={"pointer"}
            onClick={() => {
              setisedit(false);
            }}
            size={25}
            color={"black"}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <IoCloudUploadOutline size={70} className="mx-auto" color="black" />
          <label className="font-semibold">ProfilePic*</label>
          <input
            className="hidden px-4 py-2 border-2 outline-none"
            type="text"
          />
        </div>
        <div className="flex flex-col justify-center gap-3 my-6">
          <label className="font-semibold">Name*</label>
          <input className="px-4 py-2 border-2 outline-none" type="text" />
        </div>
        <div className="flex flex-col justify-center gap-3 my-6">
          <label className="font-semibold">Bio*</label>
          <textarea
            className="px-4 py-2 border-2 outline-none"
            id=""
            cols="30"
            rows="5"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
