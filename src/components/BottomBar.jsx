import propTypes from "prop-types";
import { PiHouse } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";

const BottomBarItem = ({ to, icon }) => (
  <Link to={to}>
    <li className="flex flex-col items-center gap-1 cursor-pointer">{icon}</li>
  </Link>
);

const BottomBar = () => {
  const iconColor = "#fff";

  return (
    <footer className="fixed bottom-0 w-full">
      <div className="w-full bg-[#282828] rounded-t-xl">
        <ul className="flex items-center px-2 py-5 text-sm font-semibold text-center text-white justify-evenly">
          <BottomBarItem
            to="/home"
            icon={<PiHouse size={25} color={iconColor} />}
          />
          <BottomBarItem
            to="/people"
            icon={<MdPeopleAlt size={25} color={iconColor} />}
          />
          <BottomBarItem
            to="/create"
            icon={<IoCreate size={25} color={iconColor} />}
          />
          <BottomBarItem
            to="/notifications"
            icon={<FaRegBell size={25} color={iconColor} />}
          />
          <BottomBarItem
            to="/profile"
            icon={<CgProfile size={25} color={iconColor} />}
          />
        </ul>
      </div>
    </footer>
  );
};

BottomBarItem.propTypes = {
  to: propTypes.string.isRequired,
  icon: propTypes.object,
};

export default BottomBar;
