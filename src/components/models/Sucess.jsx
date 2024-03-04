import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sucess({ setissucess }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 backdrop-blur-md">
      <div className="px-8 py-7 rounded-xl bg-[#161616] w-[90vw]">
        <div className="text-center ">
          <p className="text-lg font-semibold">
            Welcome to <span className="text-[#1d9bf0]">Matrix</span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-5 mt-4">
          <p className="py-1.5 text-sm">
            Connect with People who match your interests !
          </p>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={() => {
              setissucess(false);
              navigate("/home");
            }}
            className="px-20 py-2 text-xs rounded-full bg-[#1d9bf0] font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
