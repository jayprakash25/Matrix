import { PiHouse } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { IoMdPeople } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";

export default function BottomBar() {
  const liststyle = "flex flex-col items-center gap-1 cursor-pointer";

  return (
    <footer className="fixed bottom-0 w-full">
      <div className="w-full bg-[#282828] rounded-t-xl">
        <ul className="flex items-center px-2 py-5 text-sm font-semibold text-center text-white justify-evenly">
          <Link to={"/home"}>
            <li className={liststyle}>
              <PiHouse size={25} color="#fff" />
              {/* <h1>Home</h1> */}
            </li>
          </Link>
          <Link to={"/people"}>
            <li className={liststyle}>
              <IoMdPeople size={25} color="#fff" />
              {/* <h1>People</h1> */}
            </li>
          </Link>
          <Link to="/notifications">
            <li>
              <FaRegBell size={25} color="#fff" />
            </li>
          </Link>
          <Link to={"/profile"}>
            <li className={liststyle}>
              <CgProfile size={25} color="#fff" />
              {/* <h1>Profile</h1> */}
            </li>
          </Link>
        </ul>
      </div>
    </footer>
  );
}
