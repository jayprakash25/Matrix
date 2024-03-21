import { useEffect, useState } from "react";
import { BottomBar } from "../components";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
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
      const sentRequestsQuery = query(
        collection(db, "connectionRequests"),
        where("senderId", "==", jwt),
        where("status", "==", "accepted")
      );

      const receivedRequestsQuery = query(
        collection(db, "connectionRequests"),
        where("receiverId", "==", jwt),
        where("status", "==", "accepted")
      );

      const [sentRequestsSnapshot, receivedRequestsSnapshot] =
        await Promise.all([
          getDocs(sentRequestsQuery),
          getDocs(receivedRequestsQuery),
        ]);

      const connectedUserIds = new Set();
      sentRequestsSnapshot.forEach((doc) =>
        connectedUserIds.add(doc.data().receiverId)
      );
      receivedRequestsSnapshot.forEach((doc) =>
        connectedUserIds.add(doc.data().senderId)
      );

      const usersDataArray = await Promise.all(
        [...connectedUserIds].map(async (userId) => {
          const userDocRef = doc(db, "USERS", userId);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists() && userDocSnap.data()?.Posts) {
            return { userId, posts: userDocSnap.data().Posts };
          } else {
            return null;
          }
        })
      );

      const filteredUsersData = usersDataArray.filter((user) => user !== null);

      setposts(filteredUsersData);
      setisloading(false);
    } catch (error) {
      console.log("Posts didnt fetch", error.message);
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
