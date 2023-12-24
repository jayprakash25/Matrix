import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function Notification() {
  // fetching Notifications
  const jwt = localStorage.getItem("jwt");
  const [Notifications, setNotifications] = useState();
  const getNotifications = async () => {
    try {
      const docref = doc(db, "USERS", jwt);
      const User = await getDoc(docref);
      console.log(User.data().notifications);
      setNotifications(User.data().notifications || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <main className="flex flex-col gap-4 mt-2">
      {Notifications?.map((_, i) => {
        return (
          <React.Fragment key={i}>
            <div className="flex items-center justify-around gap-10 rounded-lg border-[1px] mx-4 p-3 border-gray-200">
              <div className="flex items-center gap-5">
                <img
                  className="object-cover w-16 h-16 rounded-full"
                  src={_.Pic}
                  alt=""
                />
                <div className="space-y-0.5">
                  <h1 className="text-lg font-bold">{_.Name}</h1>
                  <p className="text-sm font-semibold text-slate-800">
                    Connected with you
                  </p>
                </div>
              </div>
              <AiOutlineDelete size={27} cursor={"pointer"} color="black" />
            </div>
          </React.Fragment>
        );
      })}
    </main>
  );
}
