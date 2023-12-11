import React from "react";

export default function EnterOtp() {
  const user = () => {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 backdrop-blur-md">
      <div className="flex flex-col gap-8  bg-white w-[70vw] rounded-md px-5 py-9">
        <input
          type="text"
          placeholder="Enter OTP"
          className="px-2 text-center border-b-2 outline-none "
        />
        <button className="py-2 text-sm font-semibold text-white bg-black rounded-md">
          Done
        </button>
      </div>
    </div>
  );
}
