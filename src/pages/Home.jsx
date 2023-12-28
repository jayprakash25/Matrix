import { useEffect, useState } from "react";
import { BottomBar, Empty, Loader, Navbar, UsersPosts } from "../components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
export default function Home() {
  const jwt = localStorage.getItem("jwt");
  const [isloading, setisloading] = useState(true);
  const [posts, setposts] = useState();

  const fetchPosts = async () => {
    try {
      const docref = doc(db, "USERS", jwt);
      const User = await getDoc(docref);
      const currentConnectedUser = await User.data().connectedUsers;
      const posts = currentConnectedUser?.map(async (userid) => {
        const userdocref = await doc(db, "USERS", userid);
        const UserPosts = await getDoc(userdocref);
        console.log(UserPosts.data());
        setposts(UserPosts.data().Posts);
        setisloading(false);
      });
      await Promise.all(posts);
    } catch (error) {
      console.log(error);
      setisloading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      {isloading ? <Loader /> : null}
      {posts == undefined ? <Empty /> : <UsersPosts posts={posts} />}
      <BottomBar />
    </>
  );
}
