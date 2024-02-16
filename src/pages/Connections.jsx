import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { BottomBar, Loader } from "../components";

export default function Connections() {
  const jwt = localStorage.getItem("jwt");
  const docref = doc(db, "USERS", jwt);
  const [isloading, setisloading] = useState(true);
  const [Userdata, setUserdata] = useState({
    connections: [],
  });

  const getConnections = async () => {
    try {
      const User = await getDoc(docref);
      setUserdata({
        ...Userdata,
        connections: User?.data()?.Posts || [],
      });
      setisloading(false);
    } catch (error) {
      console.log(error);
      setisloading(false);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);

  return (
    <>
      {isloading ? <Loader /> : null}

      <BottomBar />
    </>
  );
}
