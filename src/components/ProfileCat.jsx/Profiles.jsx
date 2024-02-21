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
        <div className="grid grid-cols-2 gap-2 gap-y-3 p-2.5 mt-3">
          {showusers.map((user, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center border-[2px] border-zinc-800 p-4 rounded-lg px-2 ${
                connectedUser.includes(user.id) ? "connected" : ""
              }`}
            >
              <Link to={`/${user.id}`}>
                <div>
                  {user.Pic == "" || user.Pic == null ? (
                    <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/the-hub-97b71.appspot.com/o/6364b6fd26e2983209b93d18_ID_Playfal_DrawKit_Webflow_Display_2-min-png-934_2417--removebg-preview.png?alt=media&token=aa0f00e6-e1d5-4245-bfca-e5f6273ec980" ||
                        user.Pic
                      }
                      className="object-cover mx-auto rounded-full w-24 h-24"
                      alt={null}
                    />
                  ) : (
                    <img
                      src={user.Pic}
                      className="object-cover mx-auto rounded-full w-24 h-24"
                      alt={user.Pic}
                    />
                  )}
                </div>
                <div className="mt-4 space-y-3 text-center">
                  <h1 className="font-semibold ">{user.Name}</h1>
                  <p className="text-[12.5px]">{user.Bio}</p>
                </div>
                <div className="flex overflow-x-scroll max-w-xs  gap-2 mx-auto mt-4">
                  {user?.hobbies?.map((item, i) => (
                    <p
                      key={i}
                      className="text-[11px] px-3 font-semibold text-center rounded-full py-1.5 bg-sky-600"
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
          ))}
        </div>
      )}
    </>
  );
}
