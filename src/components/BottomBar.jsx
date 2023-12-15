import { PiHouse } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { IoMdPeople } from "react-icons/io";
import { IoIosSchool } from "react-icons/io";

export default function BottomBar() {
  const liststyle = "flex flex-col items-center gap-1 cursor-pointer";

  return (
    <footer className="fixed bottom-0 pb-5 px-5  w-full">
      <div className="w-full bg-black rounded-full">
        <ul className="flex items-center  p-3.5 px-2 text-sm font-semibold text-center text-white justify-evenly">
          <Link to={"/home"}>
            <li className={liststyle}>
              <PiHouse size={25} color="white" />
              {/* <h1>Home</h1> */}
            </li>
          </Link>
          <Link to={"/people"}>
            <li className={liststyle}>
              <IoMdPeople size={25} color="white" />
              {/* <h1>People</h1> */}
            </li>
          </Link>
          <li>
            <IoIosSchool size={25} color="white" />
            {/* <h1>Collage</h1> */}
          </li>
          <Link to={"/profile"}>
            <li className={liststyle}>
              <CgProfile size={25} color="white" />
              {/* <h1>Profile</h1> */}
            </li>
          </Link>
        </ul>
      </div>
    </footer>
  );
}
