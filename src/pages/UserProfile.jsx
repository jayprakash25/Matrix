import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { HiDotsHorizontal } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { useAnimation, motion } from "framer-motion";
import ModelLogout from "../components/ModelLogout";
import { GiNothingToSay } from "react-icons/gi";
import UserProfileLoader from "../components/UserProfileLoader";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { RxCross2 } from "react-icons/rx";
import { IoIosAdd } from "react-icons/io";
import {
  BottomBar,
  EditProfile,
  HobbiesModel,
  Loader,
  Works,
} from "../components";

export default function UserProfile() {
  const [isedit, setisedit] = useState(false);
  const [isdelete, setisdelete] = useState(false);
  const [isselect, setisselect] = useState(false);
  const [islogout, setislogout] = useState(false);
  const [isloading, setisloading] = useState(true);
  const navigate = useNavigate();
  const controls = useAnimation();
  const jwt = localStorage.getItem("jwt");
  const docref = doc(db, "USERS", jwt);
  const [Userdata, setUserdata] = useState({
    Pic: "",
    Name: "",
    Bio: "",
    hobbies: [],
    Posts: [],
  });

  const getPosts = async () => {
    try {
      const User = await getDoc(docref);
      setUserdata({
        ...Userdata,
        Pic: User?.data()?.Pic,
        Name: User?.data()?.Name,
        Bio: User?.data()?.Bio,
        hobbies: User?.data()?.hobbies,
        Posts: User?.data()?.Posts || [],
      });
      setisloading(false);
    } catch (error) {
      console.log(error);
      setisloading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postid) => {
    try {
      setisloading(true);
      const updatedPosts = Userdata.Posts.filter(
        (post, index) => index !== postid
      );
      console.log(updatedPosts);
      await updateDoc(docref, { Posts: updatedPosts });
      setisdelete(false);
      setUserdata({
        ...Userdata,
        Posts: updatedPosts,
      });
      setisloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deletehobbie = async (id) => {
    const currenthobbies = [...Userdata.hobbies];
    currenthobbies.splice(id, 1);
    await updateDoc(docref, { hobbies: currenthobbies });
    setUserdata({
      ...Userdata,
      hobbies: currenthobbies,
    });
  };

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
        <main>
          <nav className="p-4">
            <div className="flex items-center justify-between w-full">
              <div>
                <Link to={"/home"}>
                  <FaArrowLeft size={20} color="" />
                </Link>
              </div>
              <div className="text-center">
                <h1 className="text-lg font-semibold ">My Profile</h1>
              </div>
              <div>
                <button
                  onClick={() => {
                    setislogout(true);
                  }}
                  className="text-red-500"
                >
                  Log Out
                </button>
              </div>
            </div>
          </nav>
          <div className="flex items-start justify-center gap-5 mt-5">
            <div>
              {localStorage.getItem("UserPic") !== "" ? (
                <Link to={"/profile"}>
                  <img
                    src={localStorage.getItem("UserPic")}
                    className="object-cover rounded-full w-36 h-36"
                    alt=""
                  />
                </Link>
              ) : (
                <AccountCircleIcon color="primary" fontSize="large" />
              )}
            </div>
            <div className="max-w-[55vw] space-y-2">
              <h1 className="text-lg font-bold ">{Userdata?.Name}</h1>
              <p className="text-sm text-slate-400">{Userdata?.Bio}</p>
              <div className="flex space-x-3 ">
                <button
                  onClick={() => {
                    setisedit(true);
                  }}
                  className="py-2 text-[9px] mt-3 font-semibold text-white rounded-full bg-[#1d9bf0] px-4 "
                >
                  Edit Profile
                </button>
                {jwt === localStorage.getItem("jwt") ? (
                  <Link to={`/collabs/${jwt}`}>
                    <button className="py-2  mt-3 text-[9px] font-semibold text-white rounded-full bg-[#1d9bf0] px-4">
                      My Tasks
                    </button>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
          <h1 className="text-xl font-bold px-7 my-7">Your Hobbies</h1>
          <div className="grid grid-cols-3 gap-2 px-4 mx-auto my-3 text-center">
            <p className="px-6 py-2 flex rounded-full justify-around items-center bg-zinc-800 text-[13px]">
              <IoIosAdd
                cursor={"pointer"}
                onClick={() => {
                  setisselect(true);
                }}
                size={22}
                color={"white"}
              />
            </p>
            {Userdata?.hobbies?.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <p className="px-4 py-2 flex rounded-full justify-around items-center bg-zinc-800 text-[13px]">
                    {item}{" "}
                    <RxCross2
                      onClick={() => {
                        deletehobbie(i);
                      }}
                      cursor={"pointer"}
                      size={17}
                      color={"white"}
                    />
                  </p>
                </React.Fragment>
              );
            })}
          </div>

          <h1 className="text-xl font-bold px-7 my-7">Your Works</h1>
          <Works />
          <h1 className="text-xl font-bold px-7 my-7">Your Posts</h1>
          {isloading ? (
            <div className="flex flex-col items-center justify-center mt-10">
              <UserProfileLoader />
              <UserProfileLoader />
              <UserProfileLoader />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-5 mb-20 gap-7">
              {Userdata?.Posts != "" ? (
                Userdata?.Posts.map((item, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div className="max-w-md px-4 py-3 rounded-lg shadow-sm lg border-[1px]  border-zinc-800">
                        <div>
                          {item.image && (
                            <img
                              className="mx-auto rounded-xl w-[85vw] object-cover"
                              src={item?.image}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 mt-5">
                            <img
                              src={Userdata?.Pic}
                              className="object-cover w-12 h-12 rounded-full"
                              alt=""
                            />
                            <h1 className="text-xl font-semibold">
                              {item?.Name}
                            </h1>
                          </div>
                          <div>
                            <HiDotsHorizontal
                              onClick={() => {
                                setisdelete(true);
                              }}
                              size={25}
                              color="white"
                              cursor={"pointer"}
                            />
                            {isdelete ? (
                              <>
                                <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-25 backdrop-blur-md">
                                  <ul className="space-y-4 rounded-md bg-zinc-900">
                                    <li className="cursor-pointer py2 px- gap-7">
                                      <h1 className="p-4 text-lg">
                                        Are you Sure you want to delete this
                                        post?
                                      </h1>
                                      <div className="border-b-[1px] border-zinc-700 w-full"></div>
                                      <div className="flex items-center justify-center">
                                        <div
                                          onClick={() => {
                                            setisdelete(false);
                                          }}
                                          className="flex justify-center gap-2 px-4 pb-4 mt-3"
                                        >
                                          <h1 className="text-green-500">
                                            Cancel
                                          </h1>
                                        </div>
                                        <div
                                          onClick={() => {
                                            deletePost(i);
                                          }}
                                          className="flex justify-center gap-2 px-4 pb-4 mt-3"
                                        >
                                          <h1 className="text-red-500">
                                            Delete
                                          </h1>
                                          <AiOutlineDelete
                                            size={22}
                                            color="red"
                                          />
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                {isloading ? <Loader /> : null}
                              </>
                            ) : null}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6">{item?.Text}</p>
                      </div>
                    </React.Fragment>
                  );
                })
              ) : (
                <div className="flex flex-col items-center space-y-3 text-center mt-36">
                  <GiNothingToSay size={90} color="#252424" />
                  <h1 className="text-sm font-semibold ">
                    You haven&apos;t posted anything yet!
                  </h1>
                </div>
              )}
            </div>
          )}
          {isedit ? <EditProfile setisedit={setisedit} /> : null}
          {islogout ? (
            <ModelLogout
              setislogout={setislogout}
              handleLogout={handleLogout}
            />
          ) : null}
        </main>
      </motion.div>
      <BottomBar />
      {isselect ? <HobbiesModel setisselect={setisselect} /> : null}
    </>
  );
}
