import PropTypes from "prop-types";
import { PiHouse } from "react-icons/pi";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { TbMessageCircle2 } from "react-icons/tb";
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
        <ul className="flex items-center px-2 py-2.5 text-sm font-semibold text-center text-white justify-evenly gap-4">
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
          <BottomBarItem to="/messages" icon={<TbMessageCircle2 size={25} />} />
          <Link to={"/profile"}>
            {localStorage.getItem("UserPic") == "" ||
            localStorage.getItem("UserPic") == undefined ? (
              <>
                <img
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/the-hub-97b71.appspot.com/o/6364b6fd26e2983209b93d18_ID_Playfal_DrawKit_Webflow_Display_2-min-png-934_2417--removebg-preview.png?alt=media&token=aa0f00e6-e1d5-4245-bfca-e5f6273ec980"
                  }
                  className="object-cover rounded-full w-9 h-9"
                  alt={null}
                />
              </>
            ) : (
              <img
                src={localStorage.getItem("UserPic")}
                className="object-cover rounded-full w-9 h-9"
                alt={localStorage.getItem("UserPic")}
              />
            )}
          </Link>
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
