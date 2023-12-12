import React from "react";
import { FaRegBell } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="overflow-y-scroll ">
      <div className="flex justify-between pt-5 px-9">
        <div>
          <h1 className="text-xl font-semibold">Vvibe</h1>
        </div>
        <div>
          <Link to="/notifications">
            <FaRegBell size={25} className={`cursor-pointer`} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
