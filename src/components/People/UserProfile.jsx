import React, { useCallback, useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
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
      const currentUserHobbies = currentUserDoc.data()?.hobbies;
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
      const currentConnectedUser = User?.data()?.collabs || [];
      setCurrentConnectedUser(
        Array.isArray(currentConnectedUser) ? currentConnectedUser : []
      );
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
      <div className="flex flex-col gap-6 px-2.5 mb-20">
        {usersToMap
          ?.filter(
            (user) =>
              !CurrentConnectedUser?.includes(user.id) &&
              !user.notifications?.some((notif) => notif.id === jwt)
          )
          .map((user, index) => {
            return (
              <React.Fragment key={index}>
                <>
                  <div className="flex flex-col justify-center border-[1px] border-zinc-800 p-5">
                    <div>
                      {user.Pic == "" || user.Pic == null ? (
                        <img
                          src={
                            "https://i.pinimg.com/564x/51/96/b3/5196b34be5aec2079e4b68190299a544.jpg"
                          }
                          className="object-cover mx-auto rounded-full w-36 h-36"
                          alt={null}
                        />
                      ) : (
                        <img
                          src={user.Pic}
                          className="object-cover mx-auto rounded-full w-36 h-36"
                          alt={user.Pic}
                        />
                      )}
                    </div>
                    <div className="mt-2.5 space-y-5">
                      <h1 className="text-lg font-bold text-center">
                        {user.Name}
                      </h1>
                      <p className="text-center text-[13.5px]">{user.Bio}</p>
                      <ul className="grid max-w-xs grid-cols-3 gap-2 mx-auto">
                        {user.hobbies?.map((hobby, hobbyIndex) => (
                          <li
                            key={hobbyIndex}
                            className="text-[11px] font-semibold text-center rounded-full py-1.5 bg-sky-600"
                          >
                            {hobby}
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-center ">
                        <button
                          onClick={() => {
                            navigate(`/${user.id}`);
                          }}
                          className={`py-2 px-4 w-[50vw] text-sm font-semibold text-white rounded-full bg-[#1d9bf0]`}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
}

UserProfile.propTypes = {
  userProfiles: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
};

//   Dont remove this
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
//   Dont remove this
