import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { Loader } from "../components";
export default function ViewUserProfile() {
  const [isloading, setisloading] = useState(true);
  const { userid } = useParams();
  const jwt = localStorage.getItem("jwt");
  const Userdocref = doc(db, "USERS", jwt);
  const docref = doc(db, "USERS", userid);
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

  const sendCollab = async () => {
    // send Notification to other User for collab
    try {
      const User = await getDoc(docref);
      const userCurrentCollabsNotification =
        User?.data()?.collabNotification || [];
      const collabNotification = {
        Name: Userdocref?.data().Name,
        Bio: Userdocref?.data().Bio,
        Pic: Userdocref?.data().Pic,
      };
      await updateDoc(docref, {
        collabNotification: [
          ...userCurrentCollabsNotification,
          collabNotification,
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      {isloading ? <Loader /> : null}
      <nav className="p-4">
        <div className="flex items-center w-[55vw] justify-between">
          <div>
            <Link to={"/people"}>
              <FaArrowLeft size={20} color="orange" />
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
          <p className="text-sm text-slate-400">{Userdata.Bio}</p>
          <button
            onClick={sendCollab}
            className="py-2 text-xs font-semibold text-white rounded-lg bg-[#1d9bf0"
          >
            Collabrates
          </button>
        </div>
      </div>
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
    </main>
  );
}
