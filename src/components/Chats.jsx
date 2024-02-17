import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { Link } from "react-router-dom";

export default function Chats() {
  const jwt = localStorage.getItem("jwt");
  const [Users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const docref = doc(db, "USERS", jwt);
      const User = await getDoc(docref);
      const currentConnectedUser = await User.data().collabs;
      const usersDataArray = [];
      const users = currentConnectedUser?.map(async (userid) => {
        const userdocref = doc(db, "USERS", userid);
        const Users = await getDoc(userdocref);
        usersDataArray.push(Users.data());
      });
      await Promise.all(users);
      setUsers(usersDataArray);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(Users);
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="flex flex-col gap-5 mx-4 mt-6">
      {Users.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <Link to={`/chat/${Users}`}>
              <div className="flex items-start gap-6 border-[1.2px] border-zinc-800 p-4">
                <div>
                  <img
                    src={item.Pic}
                    className="object-cover w-20 h-20 rounded-full "
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">{item.Name}</h1>
                </div>
              </div>
            </Link>
          </React.Fragment>
        );
      })}
    </main>
  );
}
