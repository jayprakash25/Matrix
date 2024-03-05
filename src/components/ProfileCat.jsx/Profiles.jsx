import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../../Firebase";
import NotifyLoader from "../notifications/NotifyLoader";
import Emptyimg from "../../images/Empty.png";
import { useAuth } from "../../ContextProvider/AuthContext";

export default function Profiles() {
  const { category } = useParams();
  const [allUsers, setAllUsers] = useState([]);
  const [showusers, setshowusers] = useState([]);
  const [connectedUser, setConnectedUser] = useState([]);
  const [isloading, setisloading] = useState(true);
  const { currentUser } = useAuth();

  const jwt = currentUser.uid;
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

  return (
    <>
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
        <div className="grid  gap-y-4 px-2.5 mb-20">
          {showusers.map((user, index) => (
            <div
              key={index}
              className={`bg-[#282828] p-5 rounded-2xl flex items-center justify-between ${
                connectedUser.includes(user.id) ? "connected" : ""
              }`}
            >
              <Link to={`/${user.id}`}>
                {/* first section  */}
                <div className="flex items-center space-x-4">
                  <div className="rounded-full w-14 h-14">
                    <img
                      className="w-full h-full rounded-full"
                      src={
                        user.Pic
                          ? user.Pic
                          : "https://cdn-compiled-asset.piccollage.com/packs/media/assets/images/avatars/default-180e2e9af61799ca32e7da604646edd2.jpg"
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <h1>{user.Name}</h1>
                    <ul className="flex overflow-x-scroll max-w-[8rem]  gap-2 mx-auto">
                      {user.hobbies?.map((hobby, hobbyIndex) => (
                        <li
                          key={hobbyIndex}
                          className="text-[10px] px-3 font-semibold text-center rounded-full py-1.5 bg-sky-600"
                        >
                          {hobby}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>

              {/* button section  */}

              <div className="flex justify-center mt-4">
                {connectedUser.includes(user.id) ? (
                  <button className="px-5 py-2 text-xs text-center text-white rounded-full border-[1px] border-blue-500">
                    Connected
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 text-xs text-center text-white bg-blue-500 rounded-full"
                    onClick={() => {
                      navigate(`/${user.id}`);
                    }}
                  >
                    View Profile
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
