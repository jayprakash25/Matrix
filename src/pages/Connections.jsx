import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { BottomBar, Loader } from "../components";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Connections() {
  const jwt = localStorage.getItem("jwt");
  const docref = doc(db, "USERS", jwt);
  const [isloading, setisloading] = useState(true);
  const [users, setusers] = useState([]);

  const getConnections = async () => {
    try {
      const User = await getDoc(docref);
      const currentConnectedUser = (await User?.data()?.collabs) || [];
      const userArray = [];
      await Promise.all(
        currentConnectedUser?.map(async (userid) => {
          const userdocref = doc(db, "USERS", userid);
          const UsersData = await getDoc(userdocref);
          const userDataWithUid = { ...UsersData?.data(), id: UsersData.id };
          userArray.push(userDataWithUid);
        })
      );
      setusers(userArray);
      setisloading(false);
    } catch (error) {
      console.log(error);
      setisloading(false);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);

  const unConnectUser = async (id) => {
    setisloading(true);
    const updatedUsers = users.filter((user) => user.id !== id);
    await updateDoc(docref, { collabs: updatedUsers });
    setusers(updatedUsers);
    console.log(updatedUsers);
    setisloading(false);
  };

  return (
    <>
      {isloading ? <Loader /> : null}
      <nav className="p-4">
        <div className="flex items-center justify-between w-[60vw]">
          <div>
            <Link to={"/home"}>
              <FaArrowLeft size={20} color="" />
            </Link>
          </div>
          <div className="text-center">
            <h1 className="font-semibold">My Connections</h1>
          </div>
        </div>
      </nav>

      <main>
        {users?.map((user, i) => {
          return (
            <>
              <React.Fragment>
                <div
                  key={i}
                  className="max-w-md border-[1px] border-zinc-800 mx-auto my-6 p-5"
                >
                  <Link to={`/${user.id}`}>
                    <div>
                      <img
                        src={user.Pic}
                        className="object-cover w-24 h-24 mx-auto rounded-full "
                        alt=""
                      />
                    </div>
                    <div className="mt-4 space-y-3 text-center">
                      <h1 className="font-semibold ">{user.Name}</h1>
                      <p className="text-[12.5px]">{user.Bio}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {user?.hobbies?.map((item, i) => {
                        return (
                          <React.Fragment key={i}>
                            <p className="px-2.5 py-2 flex rounded-full justify-around items-center bg-zinc-800 text-[10px]">
                              {item}{" "}
                            </p>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </Link>
                  <div className="flex items-center justify-center gap-5 mt-5">
                    <button
                      onClick={() => {
                        unConnectUser(user.id);
                      }}
                      className="py-1.5 text-xs bg-red-500 rounded-full px-7"
                    >
                      Unconnect
                    </button>
                  </div>
                </div>
              </React.Fragment>
            </>
          );
        })}
      </main>

      <BottomBar />
    </>
  );
}
