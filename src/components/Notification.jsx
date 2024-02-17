import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import Loader from "./Loader";
import Emptyimg from "../images/Empty.png";
export default function Notification() {
  const jwt = localStorage.getItem("jwt");
  const [isloading, setisloading] = useState(true);
  const [notifications, setNotifications] = useState();
  const docref = doc(db, "USERS", jwt);

  const getNotifications = async () => {
    try {
      const User = await getDoc(docref);
      setNotifications(User.data().notifications || []);
      setisloading(false);
    } catch (error) {
      console.log(error);
      setisloading(false);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);

  console.log(notifications);

  const DeleteNotification = async (i) => {
    setisloading(true);
    try {
      const updatedNotifications = [...notifications];
      updatedNotifications.splice(i, 1);
      await updateDoc(docref, { notifications: updatedNotifications });
      setNotifications(updatedNotifications);
      setisloading(false);
    } catch (error) {
      console.log(error);
      setisloading(false);
    }
  };

  // const Collabrate = async (userid) => {
  //   try {
  //     await updateDoc(docref, {Collabraters:userid});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      {isloading ? <Loader /> : null}
      <main className="flex flex-col gap-4 mt-2">
        {notifications && notifications?.length > 0 ? (
          notifications?.map((_, i) => {
            return (
              <React.Fragment key={i}>
                <div className="flex items-center justify-around gap-10 rounded-lg border-[1px] mx-4 p-3 border-zinc-800 shadow-lg shadow-zinc-900">
                  <div className="flex items-center gap-5">
                    <img
                      className="object-cover w-20 h-20 rounded-full"
                      src={_.Pic}
                      alt={_.Pic}
                    />
                    <div className="space-y-2.5">
                      <h1 className="text-lg font-bold">{_.Name}</h1>
                      <p className="text-sm font-semibold">
                        Want&apos;s to Collabrate with you
                      </p>
                    </div>
                  </div>
                  <AiOutlineDelete
                    onClick={() => {
                      DeleteNotification(i);
                    }}
                    size={27}
                    cursor={"pointer"}
                    color="white"
                  />
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <div className="flex flex-col items-center mt-1 space-y-3 text-cemt-11">
            <img src={Emptyimg} alt="" className="w-60" />

            <h1 className="text-sm font-semibold ">
              You haven&apos;t posted anything yet!
            </h1>
          </div>
        )}
      </main>
    </>
  );
}
