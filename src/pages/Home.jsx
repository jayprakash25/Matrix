import { useEffect, useState } from "react";
import { BottomBar } from "../components";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import Discover from "../components/home/Discover";
import Category from "../components/home/Category";
import Empty from "../components/home/Empty";
import UsersPosts from "../components/home/UsersPosts";
import Loader from "../components/home/Loader";
import { useNavigate } from "react-router-dom";
import { useAnimation, motion } from "framer-motion";
export default function Home() {
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const controls = useAnimation();
  const [isloading, setisloading] = useState(true);
  const [posts, setposts] = useState();

  const fetchPosts = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }
      const docref = doc(db, "USERS", jwt);
      const User = await getDoc(docref);
      const currentConnectedUser = await User.data().connectedUsers;
      const posts = currentConnectedUser?.map(async (userid) => {
        const userdocref = doc(db, "USERS", userid);
        const UserPosts = await getDoc(userdocref);
        setposts(UserPosts?.data()?.Posts);
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

        {posts == undefined ? (
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
