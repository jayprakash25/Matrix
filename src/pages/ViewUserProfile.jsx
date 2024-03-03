import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../Firebase";
import { Loader } from "../components";
import { useAnimation, motion } from "framer-motion";
import { useAuth } from "../ContextProvider/AuthContext";

export default function ViewUserProfile() {
  const navigate = useNavigate();
  const { userid } = useParams();
  const { currentUser } = useAuth();

  const jwt = currentUser.uid;
  const Userdocref = doc(db, "USERS", jwt);
  const docref = doc(db, "USERS", userid);
  const controls = useAnimation();
  const [isloading, setisloading] = useState(true);
  const [popup, setpopup] = useState(false);
  const [isexists, setisexists] = useState(false);
  const [userCollabs, setUserCollabs] = useState([]);
  const [Userdata, setUserdata] = useState({
    Pic: "",
    Name: "",
    Bio: "",
    Posts: [],
    hobbies: [],
  });

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

  const currentUserData = async () => {
    const snapshot = await getDoc(docref);
    (await snapshot.data()?.notifications) || [];
    const collabs = (await snapshot.data()?.collabs) || [];
    setUserCollabs(collabs);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const User = await getDoc(docref);
        setUserdata((prevUserdata) => ({
          ...prevUserdata,
          id: User.id,
          Pic: User?.data().Pic,
          Name: User?.data().Name,
          Bio: User?.data().Bio,
          Posts: User?.data().Posts || [],
          hobbies: User?.data().hobbies || [],
        }));
        setisloading(false);
      } catch (error) {
        console.log(error);
        setisloading(false);
      }
    };

    getPosts();
    currentUserData();
  }, []);

 
  const sendCollab = async (senderId, receiverId) => {
    try {
      setisloading(true); 
      
      // Check if a pending request already exists from sender to receiver
      const requestsRef = collection(db, "connectionRequests");
      const q = query(requestsRef, where("senderId", "==", senderId), where("receiverId", "==", receiverId), where("status", "==", "pending"));
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // A pending request already exists
        console.log("A pending request already exists.");
        setpopup(true); // Assuming you have a useState hook for managing popup state
      } else {
        // No existing pending request
        const newRequest = {
          senderId: senderId,
          receiverId: receiverId,
          status: "pending",
          timestamp: new Date() 
        };
        
        await addDoc(requestsRef, newRequest);
        console.log("Collab request sent successfully.");
        navigate("/people"); 
      }
    } catch (error) {
      console.error("Error sending collab request: ", error);
    } finally {
      setisloading(false); 
    }
  };

  const checkConnection = async () => {
    try {
      const User = await getDoc(docref);
      const userCurrentCollabsNotification = User?.data().notifications || [];
      const idExists = userCurrentCollabsNotification.some(
        (notif) => notif.id === jwt
      );
      if (idExists) {
        setisexists(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkConnection();
    console.log(isexists);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {isloading ? <Loader /> : null}
      <nav className="p-4">
        <div className="flex items-center w-[55vw] justify-between">
          <div>
            <Link to={"/people"}>
              <FaArrowLeft size={20} color="white" />
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold">View Profile</h1>
          </div>
        </div>
      </nav>

      <div className="flex items-start justify-center gap-5 mt-7">
        <div className="">
          {Userdata.Pic == "" || Userdata.Pic == null ? (
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/the-hub-97b71.appspot.com/o/6364b6fd26e2983209b93d18_ID_Playfal_DrawKit_Webflow_Display_2-min-png-934_2417--removebg-preview.png?alt=media&token=aa0f00e6-e1d5-4245-bfca-e5f6273ec980"
              }
              className="object-cover rounded-full w-36 h-36"
              alt={Userdata.Pic}
            />
          ) : (
            <img
              src={Userdata.Pic}
              className="object-cover rounded-full w-36 h-36"
              alt={Userdata.Pic}
            />
          )}
        </div>
        <div className="max-w-[55vw] space-y-4">
          <h1 className="text-lg font-bold">{Userdata.Name}</h1>
          <p className="text-sm text-slate-400">{Userdata.Bio}</p>
          {userCollabs.includes(jwt) ? (
            <button className="inline-flex items-center py-2 text-sm text-center text-white border-[1px] border-blue-600 rounded-full first-letter:font-medium  px-7 ">
              Connected
            </button>
          ) : isexists ? (
            <button className="inline-flex items-center py-2 text-sm text-center text-white border-[1px] border-blue-600 rounded-full first-letter:font-medium  px-7 ">
              Connection Sent
            </button>
          ) : (
            <button
              onClick={()=>{sendCollab(jwt, userid)}}
              className="py-1.5 px-8  text-[11px] font-semibold text-white rounded-full bg-[#1d9bf0]"
            >
              Connect
            </button>
          )}
        </div>
      </div>

      <h1 className="text-xl font-bold px-7 my-7">Hobbies</h1>
      <div className="grid grid-cols-3 gap-2 px-5 mx-auto my-3 text-center">
        {Userdata?.hobbies?.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <p className="px-4 py-2 flex rounded-full justify-around items-center bg-zinc-800 text-[13px]">
                {item}
              </p>
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex flex-col items-center justify-center my-10 gap-7">
        <div className="flex flex-col items-center justify-center mt-5 mb-20 gap-7">
          {Userdata?.Posts?.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <div className="max-w-md px-4 py-3 rounded-lg shadow-sm border-[1px] border-zinc-800">
                  <div>
                    <img
                      className="mx-auto rounded-lg w-[85vw] object-cover"
                      src={item.image}
                      alt={item.image}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 mt-5">
                      <img
                        src={item.Pic}
                        className="object-cover w-12 h-12 rounded-full"
                        alt={item.Pic}
                      />
                      <h1 className="text-xl font-semibold">{item.Name}</h1>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6">{item.Text}</p>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {popup ? alert("req already sent") : null}
    </motion.div>
  );
}
