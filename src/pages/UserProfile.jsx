import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLocalPhone } from "react-icons/md";
import { PiHouse } from "react-icons/pi";
import { ImExit } from "react-icons/im";
import { BottomBar, EditProfile, Loader } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaRegBell } from "react-icons/fa";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { HiDotsHorizontal } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { signOut } from "firebase/auth";

export default function UserProfile() {
  const liststyle = "flex items-center gap-10 cursor-pointer text-lg";
  const [isedit, setisedit] = useState(false);
  const [isdelete, setisdelete] = useState(false);
  const [isloading, setisloading] = useState(true);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const docref = doc(db, "USERS", jwt);
  const [Userdata, setUserdata] = useState({
    Pic: "",
    Name: "",
    Bio: "",
    Posts: [],
  });

  console.log(Userdata.Pic);

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

  // const Logout = () => {
  //   localStorage.setItem("logout", true);
  // };

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
      const UpdatedPosts = [...Userdata.Posts];
      UpdatedPosts.splice(postid, 1);
      await updateDoc(docref, { Posts: UpdatedPosts });
      setisdelete(false);
      setUserdata({
        ...Userdata,
        Posts: UpdatedPosts,
      });
      setisloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const dummyPosts = [
    {
      Pic: "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rohit",
      image:
        "https://images.pexels.com/photos/267961/pexels-photo-267961.jpeg?auto=compress&cs=tinysrgb&w=300",
      Text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus aspernatur asperiores cum neque vero beatae quisquam harum dolores error expedita eius eaque minima, illo at ducimus voluptatum placeat totam voluptates veritatis velit est culpa voluptatem? Voluptas in, obcaecati veritatis pariatur sequi voluptatibus ex nostrum dolores, consequuntur aliquid illo, enim sunt!",
    },
    {
      Pic: "https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rohit",
      image:
        "https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=300",
      Text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus aspernatur asperiores cum neque vero beatae quisquam harum dolores error expedita eius eaque minima, illo at ducimus voluptatum placeat totam voluptates veritatis velit est culpa voluptatem? Voluptas in, obcaecati veritatis pariatur sequi voluptatibus ex nostrum dolores, consequuntur aliquid illo, enim sunt!",
    },
    {
      Pic: "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rohit",
      image:
        "https://images.pexels.com/photos/267961/pexels-photo-267961.jpeg?auto=compress&cs=tinysrgb&w=300",
      Text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus aspernatur asperiores cum neque vero beatae quisquam harum dolores error expedita eius eaque minima, illo at ducimus voluptatum placeat totam voluptates veritatis velit est culpa voluptatem? Voluptas in, obcaecati veritatis pariatur sequi voluptatibus ex nostrum dolores, consequuntur aliquid illo, enim sunt!",
    },
    {
      Pic: "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rohit",
      image:
        "https://images.pexels.com/photos/1245055/pexels-photo-1245055.jpeg?auto=compress&cs=tinysrgb&w=300",
      Text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus aspernatur asperiores cum neque vero beatae quisquam harum dolores error expedita eius eaque minima, illo at ducimus voluptatum placeat totam voluptates veritatis velit est culpa voluptatem? Voluptas in, obcaecati veritatis pariatur sequi voluptatibus ex nostrum dolores, consequuntur aliquid illo, enim sunt!",
    },
  ];

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
            <div className="space-x-3.5 flex">
              <button
                onClick={() => {
                  setisedit(true);
                }}
                className="py-2 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-500 via-amber-600 to-amber-700 px-4 "
              >
                Edit Profile
              </button>
              {jwt === localStorage.getItem("jwt") ? (
                <Link to={`/collabs/${jwt}`}>
                  <button className="py-2 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-500 via-amber-600 to-amber-700 px-7">
                    Collabrates
                  </button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <ul className="flex flex-col items-start justify-start gap-10 px-8 text-sm text-center py-7 ">
          <li className={"flex justify-between w-full items-center"}>
            <Link to="/home">
              <div className={liststyle}>
                <PiHouse size={25} color="orange" />
                <h1>Home</h1>
              </div>
            </Link>
            <Link to="/home">
              <FaArrowRight size={20} color="orange" />
            </Link>
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
            <Link to="/notifications">
              <FaArrowRight size={20} color="orange" />
            </Link>
          </li>
          <li className={"flex justify-between w-full items-center"}>
            <Link to="/privacy">
              <div className={liststyle}>
                <CgProfile size={25} color="orange" />
                <h1>Private & Policy</h1>
              </div>
            </Link>
            <Link to="/privacy">
              <FaArrowRight size={20} color="orange" />
            </Link>
          </li>
          <li className={"flex justify-between w-full items-center"}>
            <div onClick={handleLogout} className={liststyle}>
              <ImExit size={25} color="orange" />
              <h1 className="text-red-500">Logout</h1>
            </div>
            <div>
              <FaArrowRight size={20} color="orange" />
            </div>
          </li>
        </ul>
        <div className="flex flex-col items-center justify-center mt-5 mb-20 gap-7">
          {dummyPosts?.map((item, i) => {
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
                                  Are you Sure you want to delete this post?
                                </h1>
                                <div className="border-b-[1px] border-zinc-700 w-full"></div>
                                <div className="flex items-center justify-center">
                                  <div
                                    onClick={() => {
                                      setisdelete(false);
                                    }}
                                    className="flex justify-center gap-2 px-4 pb-4 mt-3"
                                  >
                                    <h1 className="text-green-500">Cancel</h1>
                                  </div>
                                  <div
                                    onClick={deletePost}
                                    className="flex justify-center gap-2 px-4 pb-4 mt-3"
                                  >
                                    <h1 className="text-red-500">Delete</h1>
                                    <AiOutlineDelete size={22} color="red" />
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
                  <p className="mt-3 text-sm leading-6">{item.Text}</p>
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
