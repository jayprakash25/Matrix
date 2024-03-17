import PropTypes from "prop-types";
import { PiHouse } from "react-icons/pi";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { TbMessageCircle2 } from "react-icons/tb";
import { useEffect } from "react";
import { useAuth } from "../ContextProvider/AuthContext";

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

  const { currentUser } = useAuth();

  const jwt = currentUser.uid;
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
      <div className="w-full bg-[#282828]">
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
            <>
              <img
                src={
                  !currentUser.pic
                    ? "https://cdn-compiled-asset.piccollage.com/packs/media/assets/images/avatars/default-180e2e9af61799ca32e7da604646edd2.jpg"
                    : currentUser.pic
                }
                className="object-cover rounded-full w-9 h-9"
                alt={null}
              />
            </>
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
