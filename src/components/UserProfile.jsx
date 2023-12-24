import React, { useCallback, useEffect, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { Loader } from "./index";
export default function UserProfile() {
  const Users = [
    {
      id: ":r11:",
      Banner:
        "https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=600",
      Profile:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      Name: "Rahul",
      Bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremqueLorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremque",
    },
    {
      id: ":r2:",
      Banner:
        "https://images.pexels.com/photos/316398/pexels-photo-316398.jpeg?auto=compress&cs=tinysrgb&w=600",
      Profile:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      Name: "Rahul",
      Bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremqueLorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremque",
    },
    {
      id: ":r3:",
      Banner:
        "https://images.pexels.com/photos/316398/pexels-photo-316398.jpeg?auto=compress&cs=tinysrgb&w=600",
      Profile:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      Name: "Rahul",
      Bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremqueLorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremque",
    },
    {
      id: ":r4:",
      Banner:
        "https://images.pexels.com/photos/316398/pexels-photo-316398.jpeg?auto=compress&cs=tinysrgb&w=600",
      Profile:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      Name: "Rahul",
      Bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremqueLorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremque",
    },
  ];

  const jwt = localStorage.getItem("jwt");

  const [CurrentConnectedUser, setCurrentConnectedUser] = useState([]);
  const [showUsers, setshowUsers] = useState();
  const [isloading, setisloading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const docref = doc(db, "USERS", jwt);
      const User = await getDoc(docref);
      console.log(User);
      const currentConnectedUser = User?.data()?.connectedUsers;
      setCurrentConnectedUser(currentConnectedUser);
      setisloading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setisloading(false);
    }
  }, [jwt]);

  const sendNotification = async (userid) => {
    try {
      console.log(userid);
      const docref = doc(db, "USERS", userid);
      const User = await getDoc(docref);
      const currentNotifications = User?.data()?.notifications || [];
      const notification = {
        message: "Connected with you",
        Name: jwt,
        Pic: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      };
      await updateDoc(docref, {
        notifications: [...currentNotifications, notification],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const connectUser = async (id) => {
    console.log("connected to user " + id + " from " + jwt);
    try {
      const docref = doc(db, "USERS", jwt);
      const User = await getDoc(docref);
      const currentConnectedUser = (await User?.data()?.connectedUsers) || [];
      await updateDoc(docref, {
        connectedUsers: [...currentConnectedUser, id],
      });
      await sendNotification(id);
      setshowUsers((prevShowUsers) =>
        prevShowUsers.filter((user) => user.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setshowUsers(Users);
    fetchData();
  }, [fetchData]);

  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        showUsers
          ?.filter((user) => !CurrentConnectedUser?.includes(user.id))
          .map((_, i) => {
            return (
              <React.Fragment key={i}>
                <div className="w-[80vw] shadow-md shadow-gray-200 mb-10">
                  <div>
                    <img
                      src={_.Banner}
                      className="rounded-t-lg border-t-[1px] border-gray-300"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-center -mt-9">
                    <img
                      src={_.Profile}
                      className="object-cover w-16 h-16 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="px-5 space-y-5 text-center bg-white py-7">
                    <h1 className="text-xl font-bold text-slate-800">
                      {_.Name}
                    </h1>
                    <p className="text-sm leading-6 text-slate-500">{_.Bio}</p>
                    <button
                      onClick={() => {
                        connectUser(_.id);
                      }}
                      className="px-10 py-2 text-white bg-black rounded-lg w-[50vw] font-semibold"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </React.Fragment>
            );
          })
      )}
    </>
  );
}
