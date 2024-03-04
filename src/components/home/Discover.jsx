import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuth } from "../../ContextProvider/AuthContext";
export default function Discover() {
  const [Notifications, setNotifications] = useState();
  const { currentUser } = useAuth();

  const jwt = currentUser.uid;
  const docref = doc(db, "USERS", jwt);

  const getNotifications = async () => {
    try {
      const User = await getDoc(docref);
      setNotifications(User?.data()?.notifications || []);
      console.log(User.data());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="flex items-center justify-between px-2 py-3">
      <div>
        <img
          src={
            !currentUser.pic
              ? "https://cdn-compiled-asset.piccollage.com/packs/media/assets/images/avatars/default-180e2e9af61799ca32e7da604646edd2.jpg"
              : currentUser.pic
          }
          className="object-cover w-10 h-10 rounded-full"
          alt=""
        />
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
