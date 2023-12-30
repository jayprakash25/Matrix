import { useEffect, useState } from "react";
import { BottomBar } from "../components";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import Discover from "../components/home/Discover";
import Category from "../components/home/Category";
import Empty from "../components/home/Empty";
import UsersPosts from "../components/home/UsersPosts";
import { useNavigate } from "react-router-dom";
import Loader from "../components/home/Loader";

export default function Home() {
  const jwt = localStorage.getItem("jwt");
  const [isloading, setisloading] = useState(true);
  const [posts, setposts] = useState();
  const navigate = useNavigate();
  const fetchPosts = async () => {
    try {
      const user = auth.currentUser;
      // if (!user) {
      //   navigate("/login");
      //   return;
      // }
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
      {/* <Navbar /> */}
      <Discover />
      {isloading ? (
        <Loader />
      ) : (
        <div>
          {posts == undefined ? <Empty /> : <UsersPosts posts={posts} />}
          <Category />
        </div>
      )}
      <BottomBar />
    </>
  );
}
