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

  // const fetchPosts = async () => {
  //   try {
  //     const docref = doc(db, "USERS", jwt);
  //     const User = await getDoc(docref);
  //     const currentConnectedUser = await User.data()?.collabs;
  //     console.log(currentConnectedUser);
  //     localStorage.setItem("UserPic", User.data()?.Pic);
  //     const posts = currentConnectedUser?.map(async (userid) => {
  //       const userdocref = doc(db, "USERS", userid);
  //       const UserPosts = await getDoc(userdocref);
  //       setposts(UserPosts?.data()?.Posts || []);
  //       console.log(UserPosts?.data()?.Posts || []);
  //     });
  //     await Promise.all(posts);
  //     setisloading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setisloading(false);
  //   }
  // };

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

      // Execute both queries concurrently
      const [sentRequestsSnapshot, receivedRequestsSnapshot] =
        await Promise.all([
          getDocs(sentRequestsQuery),
          getDocs(receivedRequestsQuery),
        ]);

      // Collect unique user IDs from both sets of requests
      const connectedUserIds = new Set();
      sentRequestsSnapshot.forEach((doc) =>
        connectedUserIds.add(doc.data().receiverId)
      );
      receivedRequestsSnapshot.forEach((doc) =>
        connectedUserIds.add(doc.data().senderId)
      );

      console.log(connectedUserIds);

      // Fetch user details
    
      const usersDataArray = await Promise.all(
        [...connectedUserIds].map(async (userId) => {
          const userDocRef = doc(db, "USERS", userId);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists() && userDocSnap.data()?.Posts) {
            return userDocSnap.data().Posts; // Return the Posts array directly
          } else {
            return []; 
          }
        })
      );

      // Flatten the array of arrays into a single array of posts
      const flattenedUsersPosts = usersDataArray.flat();

      // Filter out any undefined or null values, if necessary
      const filteredUsersPosts = flattenedUsersPosts.filter(
        (post) => post !== undefined && post !== null
      );

      setposts(filteredUsersPosts);
      setisloading(false);
    } catch (error) {
      console.log("Posts didnt fetch", error.message);
      setisloading(false);
    }
  };

  console.log(posts);

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
