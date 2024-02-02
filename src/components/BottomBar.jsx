import PropTypes from "prop-types";
import { PiHouse } from "react-icons/pi";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import AddPost from "./AddPost";
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";

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
  const jwt = localStorage.getItem("jwt");
  const docref = doc(db, "USERS", jwt);

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
    <footer className="fixed bottom-0 w-full items-center justify-center flex">
      <div className="w-full bg-[#282828] rounded-t-xl">
        <ul className="flex items-center px-2 py-2.5 text-sm font-semibold text-center text-white justify-evenly">
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
          {/* <BottomBarItem
            to="/profile"
            icon={<ImExit size={25} color={iconColor} />}
          /> */}
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
              // icon={<CgProfile size={25} color={iconColor} icon/>}
              icon={<AccountCircleIcon color="primary" fontSize="large" />}
            />
          )}
        </ul>
        {isPost ? <AddPost setisPost={setisPost} /> : null}
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
