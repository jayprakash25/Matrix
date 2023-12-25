import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLocalPhone } from "react-icons/md";
import { PiHouse } from "react-icons/pi";
import { ImExit } from "react-icons/im";
import { AddPost, BottomBar, EditProfile, Loader } from "../components";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function UserProfile() {
  const liststyle = "flex items-center gap-10 cursor-pointer text-lg";
  const [isedit, setisedit] = useState(false);
  const [isPost, setisPost] = useState(false);
  const [Posts, setPosts] = useState();
  const [isloading, setisloading] = useState(true);
  const jwt = localStorage.getItem("jwt");

  const getPosts = async () => {
    try {
      const docref = doc(db, "USERS", jwt);
      const User = await getDoc(docref);
      setPosts(User.data().Posts || []);
      setisloading(false);
    } catch (error) {
      console.log(error);
      setisloading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  const UserPosts = [
    {
      image:
        "https://images.pexels.com/photos/12909594/pexels-photo-12909594.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      Text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates est culpa dolorem, obcaecati, nostrum fugit doloribus velit cum delectus modi doloremque aperiam iure hic aspernatur assumenda illo corporis repudiandae? Veritatis.",
      userprofile:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      image:
        "https://images.pexels.com/photos/18255222/pexels-photo-18255222/free-photo-of-beautiful-quote.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      Text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates est culpa dolorem, obcaecati, nostrum fugit doloribus velit cum delectus modi doloremque aperiam iure hic aspernatur assumenda illo corporis repudiandae? Veritatis.",
      userprofile:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      image:
        "https://images.pexels.com/photos/4075551/pexels-photo-4075551.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      Text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates est culpa dolorem, obcaecati, nostrum fugit doloribus velit cum delectus modi doloremque aperiam iure hic aspernatur assumenda illo corporis repudiandae? Veritatis.",
      userprofile:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ];

  return (
    <main>
      {isloading ? <Loader /> : null}
      <nav className="p-4">
        <div className="flex items-center w-[55vw] justify-between">
          <div>
            <Link to={"/home"}>
              <FaArrowLeft size={20} color="black" />
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-lg font-semibold">My Profile</h1>
          </div>
        </div>
      </nav>

      <div className="flex items-start justify-center gap-5 mt-5">
        <div className="">
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300"
            className="object-cover rounded-full w-36 h-36"
            alt=""
          />
        </div>
        <div className="max-w-[55vw] space-y-3">
          <h1 className="text-lg font-bold">Rahul</h1>
          <p className="text-sm text-slate-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus unde
            quisquam atque, eaque recusandae ducimus perspiciatis assumenda cum
            labore fuga.
          </p>
          <button
            onClick={() => {
              setisedit(true);
            }}
            className="py-2 text-sm font-semibold text-white bg-black rounded-lg px-7"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <ul className="flex flex-col items-start justify-start gap-10 px-8 text-sm text-center py-7 my-">
        <li className={"flex justify-between w-full items-center"}>
          <div className={liststyle}>
            <PiHouse size={25} color="black" />
            <h1>Home</h1>
          </div>
          <div>
            <FaArrowRight size={20} color="black" />
          </div>
        </li>
        <li className={"flex justify-between w-full items-center"}>
          <div className={liststyle}>
            <MdOutlineLocalPhone size={25} color="black" />
            <h1>Contact</h1>
          </div>
          <div>
            <FaArrowRight size={20} color="black" />
          </div>
        </li>
        <li className={"flex justify-between w-full items-center"}>
          <div
            onClick={() => {
              setisPost(true);
            }}
            className={liststyle}
          >
            <FiEdit size={25} color="black" />
            <h1>Post</h1>
          </div>
          <div>
            <FaArrowRight size={20} color="black" />
          </div>
        </li>
        <li className={"flex justify-between w-full items-center"}>
          <div className={liststyle}>
            <CgProfile size={25} color="black" />
            <h1>Private & Policy</h1>
          </div>
          <div>
            <FaArrowRight size={20} color="black" />
          </div>
        </li>
        <li className={"flex justify-between w-full items-center"}>
          <div className={liststyle}>
            <ImExit size={25} color="" />
            <h1 className="text-red-500">Logout</h1>
          </div>
          <div>
            <FaArrowRight size={20} color="black" />
          </div>
        </li>
      </ul>
      <div className="flex flex-col items-center justify-center my-10 gap-7">
        {Posts?.map((i, index) => {
          return (
            <React.Fragment key={index}>
              <div className="border-[1px] border-gray-200 rounded-lg shadow-sm max-w-md p-4 space-y-3.5">
                <div className="flex items-center gap-5">
                  <img
                    src={i.Pic}
                    className="object-cover w-12 h-12 rounded-full"
                    alt=""
                  />
                  <h1 className="text-lg font-semibold text-slate-800">
                    {i.Name}
                  </h1>
                </div>
                <div>
                  <img src={i.image} alt="" />
                </div>
                <div>
                  <p className="text-sm leading-6 text-slate-800">{i.Text}</p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <BottomBar />
      {isedit ? <EditProfile setisedit={setisedit} /> : null}
      {isPost ? <AddPost setisPost={setisPost} /> : null}
    </main>
  );
}
