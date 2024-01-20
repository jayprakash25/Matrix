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
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropTypes from "prop-types";
import { CgProfile } from "react-icons/cg";

export default function UserProfile({ userProfiles, search }) {
  const jwt = localStorage.getItem("jwt");
  const load = [1, 2, 3, 4, 5, 6, 7, 8, 10];
  const [CurrentConnectedUser, setCurrentConnectedUser] = useState([]);
  const [showUsers, setshowUsers] = useState([]);
  const [isloading, setisloading] = useState(true);
  const docref = doc(db, "USERS", jwt);
  const navigate = useNavigate();
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

  // const sendNotification = async (userid) => {
  //   try {
  //     const docref = doc(db, "USERS", userid);
  //     const User = await getDoc(docref);
  //     const currentUserdocref = doc(db, "USERS", jwt);
  //     const currentUser = await getDoc(currentUserdocref);
  //     const currentNotifications = User?.data()?.notifications || [];
  //     const notification = {
  //       message: "Connected with you",
  //       Name: currentUser?.data()?.Name,
  //       Pic: currentUser?.data()?.Pic,
  //       id: currentUser?.id,
  //     };
  //     await updateDoc(docref, {
  //       notifications: [...currentNotifications, notification],
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const connectUser = async (id) => {
  //   console.log("connected to user " + id + " from " + jwt);
  //   setisloading(true);
  //   try {
  //     const User = await getDoc(docref);
  //     const collabs = (await User?.data()?.collabs) || [];
  //     await updateDoc(docref, {
  //       collabs: [...collabs, id],
  //     });
  //     await sendNotification(id);
  //     setshowUsers((prevShowUsers) =>
  //       prevShowUsers.filter((user) => user.id !== id)
  //     );
  //     setisloading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const usersToMap = search === " " ? showUsers : userProfiles;

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
        {usersToMap
          ?.filter(
            (user) =>
              !CurrentConnectedUser?.includes(user.id) &&
              !user.notifications?.some((notif) => notif.id === jwt)
          )
          .map((user, index) => (
            <React.Fragment key={index}>
              <>
                <div className="flex items-center justify-around gap-3 border-[1px] border-zinc-800 p-5 px-2">
                  <div>
                    {user.Pic ? (
                      <img
                        src={user.Pic}
                        className="object-cover max-w-md rounded-full w-28 h-28"
                        alt={user.Pic}
                      />
                    ) : (
                      <CgProfile size={50} />
                    )}
                  </div>
                  <div className="">
                    <h1 className="text-xl font-semibold">{user.Name}</h1>
                    <ul className="flex gap-4 mt-3 overflow-x-scroll w-60">
                      {user.hobbies?.map((hobby, hobbyIndex) => (
                        <li
                          key={hobbyIndex}
                          className="px-2 py-1 text-xs font-semibold rounded-full bg-sky-600"
                        >
                          {hobby}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => {
                        navigate(`/${user.id}`);
                      }}
                      className={`w-full py-2 px-10 mt-5  text-sm font-semibold text-white rounded-full bg-[#1d9bf0]`}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </>
            </React.Fragment>
          ))}
      </div>
    </>
  );
}

UserProfile.propTypes = {
  userProfiles: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
};
