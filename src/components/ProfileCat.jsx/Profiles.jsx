import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../Firebase";
import NotifyLoader from "../notifications/NotifyLoader";
import { GiNothingToSay } from "react-icons/gi";

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
      return user?.hobbies?.some((hobby) => category === hobby);
    });
  };

  const fil = useCallback(async () => {
    const filteredUsers = await filterHobbies(category, allUsers);
    setshowusers(filteredUsers);
  }, [category, allUsers]);

  console.log(showusers);

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

  const Collab = async (id) => {
    console.log("connected to user " + id + " from " + jwt);
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
      // setshowusers((prevShowUsers) =>
      //   prevShowUsers.filter((user) => user.id !== id)
      // );
      setisloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-5 p-5">
      {isloading ? (
        <NotifyLoader />
      ) : showusers.length === 0 ? (
        <div className="flex flex-col items-center space-y-3 text-center mt-36">
          <GiNothingToSay size={90} color="#252424" />
          <h1 className="text-sm font-semibold leading-10">
            The specified category is currently empty, but we expect new users
            to join soon!
          </h1>
        </div>
      ) : (
        showusers.map((user, index) => {
          return (
            <div key={index}>
              <div
                key={index}
                className="w-full p-4 border rounded-lg shadow max border-zinc-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-5 ">
                    <img
                      className="w-20 h-20 rounded-full shadow-lg"
                      src={user.Pic}
                      alt="Bonnie image"
                    />
                    <div className="space-y-2">
                      <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                        {user.Name}
                      </h5>
                      <p className="text-sm font-semibold">{user.Profession}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {connectedUser?.includes(user.id) ? (
                      <button className="inline-flex items-center py-2 text-sm text-center text-white border-[1px] border-blue-600 rounded-full px-7 ">
                        Collaborated
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          Collab(user.id);
                        }}
                        className="inline-flex items-center py-2 text-sm text-center text-white bg-blue-600 rounded-full px-7"
                      >
                        Collaborate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
