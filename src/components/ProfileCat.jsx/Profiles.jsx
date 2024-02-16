import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
            <div key={index}>
              <div
                key={index}
                className="w-full p-4 border rounded-lg shadow max border-zinc-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-5 ">
                    {user.Pic ? (
                      <img
                        className="object-cover w-20 h-20 rounded-full"
                        src={user.Pic}
                        alt="Bonnie image"
                      />
                    ) : (
                      <img
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/the-hub-97b71.appspot.com/o/6364b6fd26e2983209b93d18_ID_Playfal_DrawKit_Webflow_Display_2-min-png-934_2417--removebg-preview.png?alt=media&token=aa0f00e6-e1d5-4245-bfca-e5f6273ec980"
                        }
                        className="object-cover w-16 h-16 rounded-full"
                        alt=""
                      />
                    )}
                    <div className="space-y-2">
                      <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                        {user.Name}
                      </h5>
                      <p className="text-sm font-semibold">{user.Profession}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {user?.notifications?.some(
                      (notification) =>
                        notification.id === jwt &&
                        notification.message === "Connected with you"
                    ) ? (
                      <button className="inline-flex items-center py-2 text-sm text-center text-white border-[1px] border-[#1d9bf0] rounded-full px-3 ">
                        Collaboration Sent
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          Collab(user.id);
                        }}
                        className="inline-flex items-center py-2 text-sm text-center text-white bg-[#1d9bf0] rounded-full px-3"
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
