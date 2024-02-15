import PropTypes from "prop-types";
import { PiHouse } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect } from "react";

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
  const jwt = localStorage.getItem("jwt");
  const docref = doc(db, "USERS", jwt);
  const navigate = useNavigate();
  const getPic = async () => {
    try {
      if (localStorage.getItem("UserPic") == null) {
        const User = await getDoc(docref);
        localStorage.setItem("UserPic", User?.data().Pic);
        console.log(User?.data().Pic);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPic();
  }, []);

  return (
    <footer className="fixed bottom-0 flex items-center justify-center w-full">
      <div className="w-full bg-[#282828] rounded-t-xl">
        <ul className="flex items-center px-2 py-2.5 text-sm font-semibold text-center text-white justify-evenly gap-7">
          <BottomBarItem
            to="/home"
            icon={<PiHouse size={25} color={iconColor} />}
          />
          <BottomBarItem
            to="/people"
            icon={<MdPeopleAlt size={25} color={iconColor} />}
          />
          <BottomBarItem
            to="/post"
            icon={<IoCreate size={25} color={iconColor} />}
          />

          {localStorage.getItem("UserPic") ? (
            <Link to={"/profile"}>
              <img
                src={localStorage.getItem("UserPic")}
                className="object-cover w-8 h-8 rounded-full"
                alt=""
              />
            </Link>
          ) : (
            <BottomBarItem
              to="/profile"
              icon={<AccountCircleIcon color="primary" fontSize="large" />}
            />
          )}
        </ul>
      </div>
    </footer>
  );
};

BottomBarItem.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.object,
  clickFn: PropTypes.func,
};

export default BottomBar;
