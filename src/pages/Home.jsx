import React, { useEffect } from "react";
import { BottomBar, Empty, Navbar } from "../components";
import { doc, getDoc, query } from "firebase/firestore";
import { db } from "../Firebase";
export default function Home() {
  const jwt = localStorage.getItem("jwt");

  const fetchPosts = async () => {
    // get users connections
    try {
      const docref = doc(db, "USERS", jwt);
      const User = await getDoc(docref);
      const currentConnectedUser = await User.data().connectedUsers;
      console.log(currentConnectedUser);
      const posts = currentConnectedUser?.map(async (userid) => {
        const userdocref = await doc(db, "USERS", userid);
        const UserPosts = await getDoc(userdocref);
        console.log(UserPosts.data());
        return UserPosts.data();
      });
      const Userposts = await Promise.all(posts);
      console.log(Userposts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <Empty />
      <BottomBar />
    </>
  );
}
