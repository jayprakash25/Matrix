import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLocalPhone } from "react-icons/md";
import { PiHouse } from "react-icons/pi";
import { ImExit } from "react-icons/im";
import { BottomBar, EditProfile, Loader } from "../components";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaRegBell } from "react-icons/fa";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { HiDotsHorizontal } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";

export default function UserProfile() {
  const liststyle = "flex items-center gap-10 cursor-pointer text-lg";
  const [isedit, setisedit] = useState(false);
  const [count, setcount] = useState(10);
  const [isdelete, setisdelete] = useState(false);
  const [isloading, setisloading] = useState(true);
  const jwt = localStorage.getItem("jwt");
  const docref = doc(db, "USERS", jwt);
  const [Userdata, setUserdata] = useState({
    Pic: "",
    Name: "",
    Bio: "",
    Posts: [],
  });

  const getPosts = async () => {
    try {
      const User = await getDoc(docref);
      setUserdata({
        ...Userdata,
        Pic: User?.data().Pic,
        Name: User?.data().Name,
        Bio: User?.data().Bio,
        Posts: User?.data().Posts || [],
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

  const Logout = () => {
    localStorage.setItem("logout", true);
  };

  const deletePost = async (postid) => {
    try {
      setisdelete((pre) => (pre === postid ? null : postid));
      const currentPosts = [...Userdata.Posts];
      currentPosts.splice(postid, 1);
      await updateDoc(docref, { Posts: currentPosts });
      setisloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
        {isloading ? <Loader /> : null}
        <nav className="p-4">
          <div className="flex items-center w-[55vw] justify-between">
            <div>
              <Link to={"/home"}>
                <FaArrowLeft size={20} color="orange" />
              </Link>
            </div>

            <div className="text-center">
              <h1 className="text-lg font-semibold ">My Profile</h1>
            </div>
          </div>
        </nav>
        <div className="flex items-start justify-center gap-5 mt-5">
          <div className="">
            <img
              src={Userdata.Pic}
              className="object-cover rounded-full w-36 h-36"
              alt=""
            />
          </div>
          <div className="max-w-[55vw] space-y-3">
            <h1 className="text-lg font-bold ">{Userdata.Name}</h1>
            <p className="text-sm text-slate-400">{Userdata.Bio}</p>
            <div className="space-x-5">
              <button
                onClick={() => {
                  setisedit(true);
                }}
                className="py-2 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-500 via-amber-600 to-amber-700 px-7"
              >
                Edit Profile
              </button>
              {jwt === localStorage.getItem("jwt") ? (
                <button className="py-2 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-500 via-amber-600 to-amber-700 px-7">
                  Collabrates {count}
                </button>
              ) : (
                <button className="py-2 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-500 via-amber-600 to-amber-700 px-7">
                  Collabrate
                </button>
              )}
            </div>
          </div>
        </div>

        <ul className="flex flex-col items-start justify-start gap-10 px-8 text-sm text-center py-7 my-">
          <li className={"flex justify-between w-full items-center"}>
            <Link to="/home">
              <div className={liststyle}>
                <PiHouse size={25} color="orange" />
                <h1>Home</h1>
              </div>
            </Link>
            <div>
              <FaArrowRight size={20} color="orange" />
            </div>
          </li>
          <li className={"flex justify-between w-full items-center"}>
            <div className={liststyle}>
              <MdOutlineLocalPhone size={25} color="orange" />
              <h1>Contact Us</h1>
            </div>
            <div>
              <FaArrowRight size={20} color="orange" />
            </div>
          </li>
          <li className={"flex justify-between w-full items-center"}>
            <Link to="/notifications">
              <div className={liststyle}>
                <FaRegBell size={20} color="orange" />
                <h1>Notifications</h1>
              </div>
            </Link>
            <div>
              <FaArrowRight size={20} color="orange" />
            </div>
          </li>

          <li className={"flex justify-between w-full items-center"}>
            <Link to="/privacy">
              <div className={liststyle}>
                <CgProfile size={25} color="orange" />
                <h1>Private & Policy</h1>
              </div>
            </Link>
            <div>
              <FaArrowRight size={20} color="orange" />
            </div>
          </li>
          <li className={"flex justify-between w-full items-center"}>
            <div onClick={Logout} className={liststyle}>
              <ImExit size={25} color="orange" />
              <h1 className="text-red-500">Logout</h1>
            </div>
            <div>
              <FaArrowRight size={20} color="orange" />
            </div>
          </li>
        </ul>
        <div className="flex flex-col items-center justify-center mt-5 mb-20 gap-7">
          {Userdata.Posts?.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <div className="border-[1px] border-zinc-800 rounded-lg shadow-sm max-w-md p-4 space-y-3.5 ">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <img
                        src={item.Pic}
                        className="object-cover w-12 h-12 rounded-full"
                        alt={item.Pic}
                      />
                      <h1 className="text-xl font-semibold">{item.Name}</h1>
                    </div>
                    <div>
                      <HiDotsHorizontal
                        onClick={() => {
                          deletePost(i);
                        }}
                        size={25}
                        color="white"
                      />
                      {isdelete === i ? (
                        <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 backdrop-blur-md">
                          <ul className="p-10 space-y-4 rounded-md bg-zinc-800">
                            <li
                              className="flex items-center gap-7 px-5 cursor-pointer py-2 bg-[#232222]"
                              onClick={deletePost}
                            >
                              <h1 className="text-red-500 semibold">Delete</h1>
                              <AiOutlineDelete size={23} color={"red"} />
                            </li>
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <img
                      className="mx-auto w-[70vw]"
                      src={item.image}
                      alt={item.image}
                    />
                  </div>
                  <div>
                    <p className="text-sm leading-6">{item.Text}</p>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        {isedit ? <EditProfile setisedit={setisedit} /> : null}
      </main>
      <BottomBar />
    </>
  );
}
