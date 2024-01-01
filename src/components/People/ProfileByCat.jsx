import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProfileByCat() {
  // const jwt = window.localStorage.getItem("jwt");
  const { category } = useParams();
  // const [currentUser, setCurrentUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const fetchProfileByCat = useCallback(async () => {
    //getting current user details
    // const currentDocRef = doc(db, "USERS", jwt);
    // const currentUserSnapshot = await getDoc(currentDocRef);
    // const currentUser = currentUserSnapshot.data();

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

    // setCurrentUser(currentUser);
    setAllUsers(usersData);
  }, []);

  //to filter users based on hobbies
  const filterHobbies = async (category, users) => {
    return users.filter((user) => {
      // Assuming currentUser.hobbies is an array, check if user has any common hobbies
      return user.hobbies.some((hobby) => category === hobby);
    });
  };

  const fil = async () => {
    const filteredUsers = await filterHobbies(category, allUsers);
    console.log(filteredUsers);
  };

  fil();

  useEffect(() => {
    fetchProfileByCat();
  }, [fetchProfileByCat]);

  //   console.log(currentUser);
  //   console.log(allUsers);

  return <div></div>;
}
