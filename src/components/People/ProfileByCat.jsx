import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import { useCallback, useEffect, useState } from "react";

export default function ProfileByCat() {
  const jwt = window.localStorage.getItem("jwt");
  const [currentUser, setCurrentUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const fetchProfileByCat = useCallback(async () => {
    //getting current user details
    const currentDocRef = doc(db, "USERS", jwt);
    const currentUserSnapshot = await getDoc(currentDocRef);
    const currentUser = currentUserSnapshot.data();

    //getting all users details
    const docRef = collection(db, "USERS");
    const userSnapshot = await getDocs(docRef);
    const usersData = [];
    userSnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.hobbies) {
        usersData.push(userData);
      }
    });

    setCurrentUser(currentUser);
    setAllUsers(usersData);
  }, [jwt]);

  //to filter users based on hobbies
  const filterHobbies = async (currentUser, users) => {
    users.filter();
  };

  filterHobbies(currentUser, allUsers);

  useEffect(() => {
    fetchProfileByCat();
  }, [fetchProfileByCat]);

  //   console.log(currentUser);
  //   console.log(allUsers);

  return <div></div>;
}
