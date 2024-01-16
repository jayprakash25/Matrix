import React, { useCallback, useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../Firebase";
import Loader from "./Loader";
import { Link } from "react-router-dom";
export default function UserProfile({ searchpeople, setsearchpeople }) {
  const jwt = localStorage.getItem("jwt");
  const load = [1, 2, 3, 4, 5, 6, 7, 8, 10];
  const [CurrentConnectedUser, setCurrentConnectedUser] = useState([]);
  const [showUsers, setshowUsers] = useState([]);
  const [isloading, setisloading] = useState(true);
  const docref = doc(db, "USERS", jwt);

  // Matching-Algorithm
  const fetchUsersWithSimilarHobbies = async () => {
    try {
      const currentUserDoc = await getDoc(docref);
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
      console.log(usersData);
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
      const User = await getDoc(docref);
      const currentConnectedUser = User?.data()?.collabs;
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
      // connected User
      const docref = doc(db, "USERS", userid);
      const User = await getDoc(docref);
      // current User
      const currentUserdocref = doc(db, "USERS", jwt);
      const currentUser = await getDoc(currentUserdocref);
      console.log(currentUser);
      const currentNotifications = User?.data()?.notifications || [];
      const notification = {
        message: "Connected with you",
        Name: currentUser?.data()?.Name,
        Pic: currentUser?.data()?.Pic,
        id: currentUser?.id,
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
      const User = await getDoc(docref);
      const collabs = (await User?.data()?.collabs) || [];
      await updateDoc(docref, {
        collabs: [...collabs, id],
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
      {isloading ? (
        <div className="flex flex-col gap-4 ">
          {Array.from(load, (index) => (
            <Loader key={index} />
          ))}
        </div>
      ) : null}
      <div className="flex flex-col gap-4 mb-20">
        {showUsers
          ?.filter((user) => !CurrentConnectedUser?.includes(user.id))
          .map((_, i) => {
            return (
              <React.Fragment key={i}>
                <Link to="/home">
                  <div className="flex items-start justify-center gap-3 border-[1px] border-zinc-800 p-5">
                    <div>
                      <img
                        src={_.Pic}
                        className="object-cover rounded-full w-28 h-28"
                        alt={_.Pic}
                      />
                    </div>
                    <div className="max-w-xs ">
                      <h1 className="text-xl font-semibold">{_.Name}</h1>
                      <p className="mt-3 text-xs leading-5 text-slate-400">
                        {_.Bio}
                      </p>
                      <ul className="flex gap-4 mt-5 overflow-x-scroll">
                        {_.hobbies.map((i, index) => {
                          return (
                            <li
                              key={index}
                              className="px-2 py-1 text-xs font-semibold rounded-full bg-sky-600"
                            >
                              {i}
                            </li>
                          );
                        })}
                      </ul>
                      <button
                        onClick={() => {
                          connectUser(_.id);
                        }}
                        className={`w-full py-2 mt-6 text-sm font-semibold text-white rounded-full bg-[#1d9bf0]`}
                      >
                        Collab
                      </button>
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
}
