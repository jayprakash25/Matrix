import { useEffect, useState } from "react";
import { BottomBar } from "../components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import Discover from "../components/home/Discover";
import Category from "../components/home/Category";
import Empty from "../components/home/Empty";
import UsersPosts from "../components/home/UsersPosts";
import Loader from "../components/home/Loader";
import { useAnimation, motion } from "framer-motion";
import { useAuth } from "../ContextProvider/AuthContext";
export default function Home() {
  const { currentUser } = useAuth();

  const jwt = currentUser.uid;
  const controls = useAnimation();
  const [isloading, setisloading] = useState(true);
  const [posts, setposts] = useState();

  const fetchPosts = async () => {
    try {
      // const user = auth.currentUser;
      const docref = doc(db, "USERS", jwt);
      const User = await getDoc(docref);
      const currentConnectedUser = await User.data()?.collabs;
      console.log(currentConnectedUser);
      localStorage.setItem("UserPic", User.data()?.Pic);
      const posts = currentConnectedUser?.map(async (userid) => {
        const userdocref = doc(db, "USERS", userid);
        const UserPosts = await getDoc(userdocref);
        setposts(UserPosts?.data()?.Posts || []);
        console.log(UserPosts?.data()?.Posts || []);
      });
      await Promise.all(posts);
      setisloading(false);
    } catch (error) {
      console.log(error);
      setisloading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    console.log(posts.length);
  }, []);

  useEffect(() => {
    const startAnimation = async () => {
      await controls.start("animate");
    };
    startAnimation();
  }, [controls]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const pageTransition = { duration: 0.5 };

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Discover />
        <Category />
        {posts?.length == 0 ? (
          <Empty />
        ) : isloading ? (
          <Loader />
        ) : (
          <UsersPosts posts={posts} />
        )}
      </motion.div>
      <BottomBar />
    </>
  );
}
