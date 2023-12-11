import React from "react";
import { FaRegBell } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="overflow-y-scroll ">
      <div className="flex justify-between pt-5 px-9">
        <div>
          <h1 className="text-xl font-semibold">Vvibe</h1>
        </div>
        <div>
          <FaRegBell size={25} className={`cursor-pointer`} />
        </div>
      </div>
    </nav>
  );
}
