import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function Discover() {
  const [Notifications, setNotifications] = useState();
  const [Pic, setPic] = useState();
  const jwt = localStorage.getItem("jwt");
  const docref = doc(db, "USERS", jwt);

  const getNotifications = async () => {
    try {
      const User = await getDoc(docref);
      setNotifications(User?.data()?.notifications || []);
      setPic(User?.data()?.Pic);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="flex items-center justify-between px-5 py-3">
      <div>
        {localStorage.getItem("UserPic") !== "" ? (
          <img
            src={localStorage.getItem("UserPic")}
            className="object-cover w-10 h-10 rounded-full"
            alt=""
          />
        ) : (
          <AccountCircleIcon color="primary" fontSize="large" />
        )}
      </div>
      <div>
        <Link to={"/notifications"}>
          {Notifications?.length > 0 ? (
            <div className="w-1.5 h-1.5 translate-x-3.5 rounded-full bg-[#1d9bf0]"></div>
          ) : null}
          <FaRegBell size={25} color="white" />
        </Link>
      </div>
    </div>
  );
}
