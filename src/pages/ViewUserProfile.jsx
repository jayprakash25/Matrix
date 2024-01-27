import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { Loader, Works } from "../components";
import { useAnimation, motion } from "framer-motion";

export default function ViewUserProfile() {
  const navigate = useNavigate();
  const { userid } = useParams();
  const jwt = localStorage.getItem("jwt");
  const Userdocref = doc(db, "USERS", jwt);
  const docref = doc(db, "USERS", userid);
  const controls = useAnimation();
  const [isloading, setisloading] = useState(true);
  const [popup, setpopup] = useState(false);
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

  const currentUser = async () => {
    const snapshot = await getDoc(docref);
    const user = snapshot.data()?.notifications || [];
    setUserCollabs(user);
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
    currentUser();
  }, []);

  const sendCollab = async () => {
    try {
      const User = await getDoc(docref);
      const me = await getDoc(Userdocref);
      const userCurrentCollabsNotification = User?.data()?.notifications || [];
      const notification = {
        Name: me?.data()?.Name,
        Bio: me?.data()?.Bio,
        Pic: me?.data()?.Pic,
        id: me?.id,
      };
      const idExists = userCurrentCollabsNotification.some(
        (notif) => notif.id === notification.id
      );
      if (!idExists) {
        await updateDoc(docref, {
          notifications: [...userCurrentCollabsNotification, notification],
        });
        navigate("/people");
      } else {
        setpopup(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <img
            src={Userdata.Pic}
            className="object-cover rounded-full w-36 h-36"
            alt={Userdata.Pic}
          />
        </div>
        <div className="max-w-[55vw] space-y-4">
          <h1 className="text-lg font-bold">{Userdata.Name}</h1>
          <p className="text-sm text-slate-400">{Userdata.Bio}</p>
          {userCollabs.some((collab) => collab.id === jwt) ? (
            <button className="inline-flex items-center py-2 text-sm text-center text-white border-[1px] border-blue-600 rounded-full first-letter:font-medium  px-7 focus:ring-4 focus:outline-none focus:ring-blue-300">
              Connection Sent
            </button>
          ) : (
            <button
              onClick={sendCollab}
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
      <h1 className="text-xl font-bold px-7 my-7">Works</h1>
      <Works id={userid} />
      <div className="flex flex-col items-center justify-center my-10 gap-7">
        <div className="flex flex-col items-center justify-center mt-5 mb-20 gap-7">
          {Userdata?.Posts?.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <div className="max-w-md px-4 py-3 rounded-lg shadow-sm">
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
