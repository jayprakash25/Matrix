import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { db } from "../../Firebase";
import NotifyLoader from "../notifications/NotifyLoader";
import Emptyimg from "../../images/Empty.png";

export default function Profiles() {
  const { category } = useParams();
  const [allUsers, setAllUsers] = useState([]);
  const [showusers, setshowusers] = useState([]);
  const [connectedUser, setConnectedUser] = useState([]);
  const [isloading, setisloading] = useState(true);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const fetchProfileByCat = useCallback(async () => {
    const docRef = collection(db, "USERS");
    const userSnapshot = await getDocs(docRef);
    const usersData = [];
    userSnapshot.forEach((doc) => {
      const userData = doc?.data();
      if (userData?.hobbies && jwt !== doc.id) {
        usersData?.push({
          id: doc.id,
          ...userData,
        });
      }
    });
    setAllUsers(usersData);
    setisloading(false);
  }, [jwt]);

  const fetchCollabs = useCallback(async () => {
    const docRef = doc(db, "USERS", jwt);
    const User = await getDoc(docRef);
    const collabs = User?.data()?.collabs || [];
    setConnectedUser(collabs || []);
    setisloading(false);
  }, [jwt]);

  console.log(connectedUser);

  const filterHobbies = async (category, users) => {
    return users?.filter((user) => {
      return user?.hobbies?.some((hobby) => category === hobby);
    });
  };

  const fil = useCallback(async () => {
    const filteredUsers = await filterHobbies(category, allUsers);
    setshowusers(filteredUsers);
  }, [category, allUsers]);

  useEffect(() => {
    fetchProfileByCat();
    fetchCollabs();
  }, [fetchProfileByCat, fetchCollabs]);

  useEffect(() => {
    fil();
  }, [fil]);

  const sendNotification = async (userid) => {
    try {
      const docref = doc(db, "USERS", userid);
      const User = await getDoc(docref);
      const currentUserdocref = doc(db, "USERS", jwt);
      const currentUser = await getDoc(currentUserdocref);
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

  const Collab = async (id) => {
    setisloading(true);
    try {
      const docref = doc(db, "USERS", jwt);
      const User = await getDoc(docref);
      const collabs = (await User?.data()?.collabs) || [];
      await updateDoc(docref, {
        collabs: [...collabs, id],
      });
      await sendNotification(id);
      navigate(`/${id}`);
      setisloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      {isloading ? (
        <NotifyLoader />
      ) : showusers.length === 0 ? (
        <div className="flex flex-col items-center mt-20 space-y-3 text-center">
          <img src={Emptyimg} alt="" className="w-60" />
          <h1 className="max-w-xs text-sm font-semibold leading-8">
            The specified category is currently empty, but we expect new users
            to join soon!
          </h1>
        </div>
      ) : (
        showusers.map((user, index) => {
          return (
            <>
              <React.Fragment key={index}>
                <div
                  key={index}
                  className="w-[87vw] border-[1px] border-zinc-800 mx-auto mb-5  p-5"
                >
                  <Link to={`/${user.id}`}>
                    <div>
                      <img
                        src={user.Pic}
                        className="object-cover w-24 h-24 mx-auto rounded-full "
                        alt=""
                      />
                    </div>
                    <div className="mt-4 space-y-3 text-center">
                      <h1 className="font-semibold ">{user.Name}</h1>
                      <p className="text-[12.5px]">{user.Bio}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {user?.hobbies?.map((item, i) => {
                        return (
                          <React.Fragment key={i}>
                            <p className="px-2.5 py-2 flex rounded-full justify-around items-center bg-zinc-800 text-[10px]">
                              {item}{" "}
                            </p>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </Link>
                  <div className="flex justify-center mt-4">
                    {user?.notifications?.some(
                      (notification) =>
                        notification.id === jwt &&
                        notification.message === "Connected with you"
                    ) && connectedUser.includes(user.id) ? (
                      <button className="px-10 py-2 text-xs text-center text-white rounded-full border-[1px] border-blue-500">
                        Connection Sent
                      </button>
                    ) : (
                      <button className="px-10 py-2 text-xs text-center text-white bg-blue-500 rounded-full">
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              </React.Fragment>
            </>
          );
        })
      )}
    </div>
  );
}

{
  /* <div>
                    {user?.notifications?.some(
                      (notification) =>
                        notification.id === jwt &&
                        notification.message === "Connected with you"
                    ) && connectedUser.includes(user.id) ? (
                      <button className="px-6 py-2  text-xs text-center text-white rounded-full border-[1px] border-blue-500">
                        Connection Sent
                      </button>
                    ) : (
                      <button className="px-6 py-1.5 text-xs text-center text-white bg-blue-500 rounded-full">
                        Connect
                      </button>
                    )}
                  </div> */
}
