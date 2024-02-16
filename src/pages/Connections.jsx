import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { BottomBar, Loader } from "../components";

export default function Connections() {
  const jwt = localStorage.getItem("jwt");
  const docref = doc(db, "USERS", jwt);
  const [isloading, setisloading] = useState(true);
  const [users, setusers] = useState();

  const getConnections = async () => {
    try {
      const User = await getDoc(docref);
      const currentConnectedUser = (await User?.data()?.collabs) || [];
      const AllUsers = currentConnectedUser?.map(async (userid) => {
        const userdocref = doc(db, "USERS", userid);
        const UsersData = await getDoc(userdocref);
        const userarray = [];
        userarray.push(UsersData?.data());
        setusers(userarray);
      });
      await Promise.all(AllUsers);
      setisloading(false);
    } catch (error) {
      console.log(error);
      setisloading(false);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);

  console.log(users);

  return (
    <>
      {isloading ? <Loader /> : null}

      <BottomBar />
    </>
  );
}
