import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../Firebase";
import NotifyLoader from "../notifications/NotifyLoader";

export default function Profiles() {
  const { category } = useParams();
  const [allUsers, setAllUsers] = useState([]);
  const [showusers, setshowusers] = useState([]);
  const [connectedUser, setConnectedUser] = useState([]);
  const [isloading, setisloading] = useState(true);
  const jwt = localStorage.getItem("jwt");

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
    const collabs = User.data().collabs;
    setConnectedUser(collabs);
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
      {isloading ? (
        <NotifyLoader />
      ) : (
        showusers.map((_, index) => {
          return (
            <Link to={`/${_.id}`}>
              <div
                key={index}
                className="w-full p-4 border rounded-lg shadow max border-zinc-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-5 ">
                    <img
                      className="w-20 h-20 rounded-full shadow-lg"
                      src={_.Pic}
                      alt="Bonnie image"
                    />
                    <div className="space-y-2">
                      <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                        {_.Name}
                      </h5>
                      <p className="text-sm font-semibold">{_.Profession}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {connectedUser.some((user) => user === _.id) ? (
                      <button className="inline-flex items-center py-2 text-sm text-center text-white border-[1px] border-blue-600 rounded-full first-letter:font-medium  px-7 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        Collaborated
                      </button>
                    ) : (
                      <button className="inline-flex items-center py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-full px-7 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Colloborate
                      </button>
                    )}
                    {console.log(_.id)}
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
