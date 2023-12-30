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
  const load = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11];

  const dummydata = [
    {
      id: "dlvndv03e930",
      Pic: "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rahul",
      Bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam laudantium deleniti sequi reprehenderit. Qui, minus suscipit, explicabo impedit quasi accusamus culpa magni iusto, ratione neque assumenda placeat vitae numquam rerum",
      Hobbies: [
        "Reading",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "",
      ],
    },
    {
      id: "dlvndv03e930",
      Pic: "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rahul",
      Bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam laudantium deleniti sequi reprehenderit. Qui, minus suscipit, explicabo impedit quasi accusamus culpa magni iusto, ratione neque assumenda placeat vitae numquam rerum",
      Hobbies: [
        "Reading",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "",
      ],
    },
    {
      id: "dlvndv03e930",
      Pic: "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rahul",
      Bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam laudantium deleniti sequi reprehenderit. Qui, minus suscipit, explicabo impedit quasi accusamus culpa magni iusto, ratione neque assumenda placeat vitae numquam rerum",
      Hobbies: [
        "Reading",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "",
      ],
    },
    {
      id: "dlvndv03e930",
      Pic: "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rahul",
      Bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam laudantium deleniti sequi reprehenderit. Qui, minus suscipit, explicabo impedit quasi accusamus culpa magni iusto, ratione neque assumenda placeat vitae numquam rerum",
      Hobbies: [
        "Reading",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "",
      ],
    },
    {
      id: "dlvndv03e930",
      Pic: "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rahul",
      Bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam laudantium deleniti sequi reprehenderit. Qui, minus suscipit, explicabo impedit quasi accusamus culpa magni iusto, ratione neque assumenda placeat vitae numquam rerum",
      Hobbies: [
        "Reading",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "",
      ],
    },
    {
      id: "dlvndv03e930",
      Pic: "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rahul",
      Bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam laudantium deleniti sequi reprehenderit. Qui, minus suscipit, explicabo impedit quasi accusamus culpa magni iusto, ratione neque assumenda placeat vitae numquam rerum",
      Hobbies: [
        "Reading",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "",
      ],
    },
    {
      id: "dlvndv03e930",
      Pic: "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rahul",
      Bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam laudantium deleniti sequi reprehenderit. Qui, minus suscipit, explicabo impedit quasi accusamus culpa magni iusto, ratione neque assumenda placeat vitae numquam rerum",
      Hobbies: [
        "Reading",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "Hiking",
        "",
      ],
    },
  ];

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
        {dummydata
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
                    <div className="max-w-xs space-y-3.5">
                      <h1 className="text-xl font-semibold">{_.Name}</h1>
                      <p className="text-xs leading-5 text-slate-400">
                        {_.Bio}
                      </p>
                      <ul className="flex gap-4 overflow-x-scroll">
                        {_.Hobbies.map((i) => {
                          return (
                            <li className="px-2 py-0.5 rounded-full  text-sm bg-gradient-to-r from-yellow-600 via-amber-600 to-amber-700   text-white ">
                              {i}
                            </li>
                          );
                        })}
                      </ul>
                      <button
                        onClick={() => {
                          connectUser(_.id);
                        }}
                        className={`w-full py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-yellow-600 via-yellow-600 to-amber-700  active:brightness-75 ease-in-out duration-300`}
                      >
                        Connect
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
