import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { Loader } from "../components";
export default function ViewUserProfile() {
  const [isloading, setisloading] = useState(true);
  const { userid } = useParams();
  const [Userdata, setUserdata] = useState({
    Pic: "",
    Name: "",
    Bio: "",
    Posts: [],
  });

  const getPosts = async () => {
    try {
      const docref = doc(db, "USERS", userid);
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

  return (
    <main>
      {isloading ? <Loader /> : null}
      <nav className="p-4">
        <div className="flex items-center w-[55vw] justify-between">
          <div>
            <Link to={"/people"}>
              <FaArrowLeft size={20} color="black" />
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
            alt=""
          />
        </div>
        <div className="max-w-[55vw] space-y-3">
          <h1 className="text-lg font-bold">{Userdata.Name}</h1>
          <p className="text-sm text-slate-500">{Userdata.Bio}</p>
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
      <div className="flex flex-col items-center justify-center my-10 gap-7">
        {Userdata.Posts?.map((i, index) => {
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
                    Rahul
                  </h1>
                </div>
                <div>
                  <img src={i.image} alt="" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-6 text-slate-800">
                    {i.Text}
                  </p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </main>
  );
}
