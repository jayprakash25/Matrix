import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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

  const filterHobbies = async (category, users) => {
    return users?.filter((user) => {
      const isNotRequested = !user.notifications?.some(
        (notification) => notification.id === jwt
      );
      return (
        isNotRequested && user?.hobbies?.some((hobby) => category === hobby)
      );
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

  console.log(connectedUser);

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
        showusers.map((user, index) => (
          <div
            key={index}
            className={`w-[87vw] border-[1px] border-zinc-800 mx-auto mb-5  p-5 ${
              connectedUser.includes(user.id) ? "connected" : ""
            }`}
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
                {user?.hobbies?.map((item, i) => (
                  <p
                    key={i}
                    className="px-2.5 py-2 flex rounded-full justify-around items-center bg-zinc-800 text-[10px]"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </Link>
            <div className="flex justify-center mt-4">
              {connectedUser.includes(user.id) ? (
                <button className="px-10 py-2 text-xs text-center text-white rounded-full border-[1px] border-blue-500">
                  Connected
                </button>
              ) : (
                <button
                  className="px-10 py-2 text-xs text-center text-white bg-blue-500 rounded-full"
                  onClick={() => {
                    navigate(`/${user.id}`);
                  }}
                >
                  View Profile
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
