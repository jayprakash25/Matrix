import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import NotifyLoader from "./NotifyLoader";
import { RxCross2 } from "react-icons/rx";
import { TiTickOutline } from "react-icons/ti";

export default function Notification() {
  const jwt = localStorage.getItem("jwt");
  const [isloading, setisloading] = useState(true);
  const [Notifications, setNotifications] = useState();
  const [collabs, setcollabs] = useState();

  const getNotifications = async () => {
    try {
      const docref = doc(db, "USERS", jwt);
      const User = await getDoc(docref);
      console.log(User?.data().notifications);
      setNotifications(User.data().notifications || []);
      setcollabs(User.data().collabs || []);
      setisloading(false);
    } catch (error) {
      console.log(error);
      setisloading(false);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);

  const DeleteNotification = async (i) => {
    setisloading(true);
    try {
      const updatedNotifications = [...Notifications];
      updatedNotifications.splice(i, 1);
      const docRef = doc(db, "USERS", jwt);
      await updateDoc(docRef, { notifications: updatedNotifications });
      setNotifications(updatedNotifications);
      setisloading(false);
    } catch (error) {
      console.log(error);
      setisloading(false);
    }
  };

  const acceptRequest = async (userid) => {
    try {
      console.log(userid);
      const updatedCuurentCollabs = [...collabs, userid];
      const docRef = doc(db, "USERS", jwt);
      await updateDoc(docRef, { collabs: updatedCuurentCollabs });
      setNotifications((prev) =>
        prev?.filter((notification) => notification.id !== userid)
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log(Notifications);

  return (
    <>
      {isloading ? (
        <NotifyLoader />
      ) : (
        <main className="flex flex-col gap-4 mt-2">
          {Notifications?.map((_, i) => {
            return (
              <React.Fragment key={i}>
                <div className="flex items-center justify-around gap-2 rounded-lg border-[1px] mx-4 p-3 border-zinc-800 shadow-lg shadow-zinc-900">
                  <div className="flex items-center gap-5">
                    <img
                      className="object-cover w-16 h-16 rounded-full"
                      src={_.Pic}
                      alt={_.Pic}
                    />
                    <div className="space-y-1">
                      <h1 className="text-lg font-bold">{_.Name}</h1>
                      <p className="text-sm font-semibold">
                        Want&apos;s to Collabrate with you
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <RxCross2
                      onClick={() => {
                        DeleteNotification(i);
                      }}
                      size={25}
                      cursor={"pointer"}
                      color="red"
                    />
                    <TiTickOutline
                      onClick={() => {
                        acceptRequest(_.id);
                      }}
                      size={25}
                      color="green"
                    />
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </main>
      )}
    </>
  );
}
