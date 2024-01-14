import propTypes from "prop-types";
import { PiHouse } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { ImExit } from "react-icons/im";
import AddPost from "./AddPost";

import { useState } from "react";

const BottomBarItem = ({ to, icon, clickFn }) => (
  <Link to={to}>
    <li
      onClick={clickFn}
      className="flex flex-col items-center gap-1 cursor-pointer"
    >
      {icon}
    </li>
  </Link>
);

const BottomBar = () => {
  const iconColor = "#fff";
  const [isPost, setisPost] = useState(false);

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
            clickFn={() => {
              setisPost(true);
            }}
            icon={<IoCreate size={25} color={iconColor} />}
          />
          <BottomBarItem
            to="/profile"
            icon={<ImExit size={25} color={iconColor} />}
          />
          <BottomBarItem
            to="/profile"
            icon={<CgProfile size={25} color={iconColor} />}
          />
        </ul>
        {isPost ? <AddPost setisPost={setisPost} /> : null}
      </div>
    </footer>
  );
};

BottomBarItem.propTypes = {
  to: propTypes.string,
  icon: propTypes.object,
  clickFn: propTypes,
};

export default BottomBar;
