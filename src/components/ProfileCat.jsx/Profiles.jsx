import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase";

export default function Profiles() {
  const { category } = useParams();
  const [allUsers, setAllUsers] = useState([]);
  const [showusers, setshowusers] = useState([]);
  const [connectedUser, setConnectedUser] = useState([]);
  const jwt = window.localStorage.getItem("jwt");

  const fetchProfileByCat = useCallback(async () => {
    //getting all users details
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
    // setCurrentUser(currentUser);
    setAllUsers(usersData);
  }, [jwt]);

  const fetchCollabs = useCallback(async () => {
    const docRef = doc(db, "USERS", jwt);
    const User = await getDoc(docRef);
    const collabs = User.data().collabs;
    setConnectedUser(collabs);
  }, [jwt]);

  const filterHobbies = async (category, users) => {
    return users?.filter((user) => {
      return user?.hobbies?.some((hobby) => category === hobby);
    });
  };

  const fil = useCallback(async () => {
    const filteredUsers = await filterHobbies(category, allUsers);
    setshowusers(filteredUsers);
  }, [allUsers, category]);

  console.log(showusers);

  useEffect(() => {
    fetchProfileByCat();
    fetchCollabs();
  }, [fetchProfileByCat, fetchCollabs]);
  useEffect(() => {
    fil();
  }, [fil]);

  console.log(connectedUser);
  return (
    <div className="p-5">
      {showusers.map((_, index) => {
        return (
          <div
            key={index}
            className="w-full max-w-sm p-4 border  rounded-lg shadow  border-zinc-800"
          >
            <div className="flex justify-between items-center ">
              <div className="flex items-center space-x-2">
                <img
                  className="w-20 h-20  rounded-full shadow-lg"
                  src={_.Pic}
                  alt="Bonnie image"
                />
                <div className="grid">
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {_.Name}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {_.Profession}
                  </span>
                </div>
              </div>
              <div className="flex">
                {connectedUser.some((user) => user === _.id) ? (
                  <button>Coloborated</button>
                ) : (
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Colloborate
                  </button>
                )}
                {console.log(_.id)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
