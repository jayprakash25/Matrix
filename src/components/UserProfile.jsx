import React, { useCallback, useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../Firebase";
import { Loader } from "./index";
import { Link } from "react-router-dom";
export default function UserProfile() {
  const jwt = localStorage.getItem("jwt");

  const [CurrentConnectedUser, setCurrentConnectedUser] = useState([]);
  const [showUsers, setshowUsers] = useState([]);
  const [isloading, setisloading] = useState(true);
  // Matching-Algorithm
  const fetchUsersWithSimilarHobbies = async () => {
    try {
      const currentUserDocRef = doc(db, "USERS", jwt);
      const currentUserDoc = await getDoc(currentUserDocRef);
      const currentUserHobbies = currentUserDoc.data().hobbies;
      const Users = await getDocs(collection(db, "USERS"));
      const usersData = Users?.docs
        ?.map((user) => ({ id: user.id, ...user.data() }))
        ?.filter((user) => {
          if (user.id === jwt) {
            return false;
          }
          const commonHobbies = currentUserHobbies?.filter((hobby) =>
            user?.hobbies?.includes(hobby)
          );
          return commonHobbies?.length > 0;
        });
      setshowUsers(usersData);
      setisloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsersWithSimilarHobbies();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const docref = doc(db, "USERS", jwt);
      const User = await getDoc(docref);
      const currentConnectedUser = User?.data()?.connectedUsers;
      setCurrentConnectedUser(currentConnectedUser);
      setisloading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setisloading(false);
    }
  }, [jwt]);

  useEffect(() => {
    setshowUsers();
    fetchData();
  }, [fetchData]);

  const sendNotification = async (userid) => {
    try {
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
    setisloading(true);
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
      setisloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isloading ? <Loader /> : null}
      {showUsers
        ?.filter((user) => !CurrentConnectedUser?.includes(user.id))
        .map((_, i) => {
          return (
            <React.Fragment key={i}>
              <Link to={`/${_.id}`}>
                <div className="w-[76vw] shadow-md shadow-gray-200 mb-1.5 cursor-pointer">
                  <div>
                    <img
                      src={_.Banner}
                      className="rounded-t-lg border-t-[1px] border-gray-300"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-center -mt-9">
                    <img
                      src={_.Pic}
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
                      Follow
                    </button>
                  </div>
                </div>
              </Link>
            </React.Fragment>
          );
        })}
    </>
  );
}
