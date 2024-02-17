import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import NotifyLoader from "./NotifyLoader";
import { RxCross2 } from "react-icons/rx";
import { TiTickOutline } from "react-icons/ti";
import Emptyimg from "../../images/Empty.png";

export default function Notification() {
  const jwt = localStorage.getItem("jwt");
  const [isloading, setisloading] = useState(true);
  const [Notifications, setNotifications] = useState();
  const [collabs, setcollabs] = useState([]);

  const getNotifications = async () => {
    try {
      const docref = doc(db, "USERS", jwt);
      const User = await getDoc(docref);
      const filteredCollabs = User?.data()?.collabs || [];
      setcollabs(filteredCollabs);
      const filteredNotifications = User.data()?.notifications.filter(
        (notification) => {
          return !filteredCollabs.includes(notification.id);
        }
      );

      setNotifications(filteredNotifications || []);
      setisloading(false);
    } catch (error) {
      console.log(error);
      setisloading(false);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);

  console.log(Notifications);

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
      const updatedCuurentCollabs = [...collabs, userid];
      const docRef = doc(db, "USERS", jwt);
      const currentUser = await getDoc(docRef);
      const otherUser = doc(db, "USERS", userid);
      const otherUserData = await getDoc(otherUser);

      await updateDoc(docRef, { collabs: updatedCuurentCollabs });

      const otherUserNotifications = otherUserData?.data()?.notifications || [];
      const notification = {
        id: jwt,
        Pic: currentUser?.data()?.Pic,
        message: `${currentUser?.data()?.Name} accepted your request`,
      };
      await updateDoc(otherUser, {
        notifications: [...otherUserNotifications, notification],
      });

      DeleteNotification(Notifications?.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isloading ? (
        <NotifyLoader />
      ) : (
        <main className="flex flex-col gap-4 mt-2">
          {Notifications.length > 0 ? (
            Notifications?.map((_, i) => {
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
                        <p className="text-sm font-semibold">{_.message}</p>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      {_.message === "Wants to Connect with you" ? (
                        <>
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
                        </>
                      ) : (
                        <RxCross2
                          onClick={() => {
                            DeleteNotification(i);
                          }}
                          size={25}
                          cursor={"pointer"}
                          color="red"
                        />
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <div className="flex flex-col items-center mt-24 space-y-3 text-cemt-11">
              <img src={Emptyimg} alt="" className="w-60" />
              <h1 className="text-sm font-semibold ">
                You dont have any Notifications !
              </h1>
            </div>
          )}
        </main>
      )}
    </>
  );
}
