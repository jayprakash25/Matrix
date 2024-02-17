import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { Link } from "react-router-dom";

export default function Chats() {
  const jwt = localStorage.getItem("jwt");
  const [Users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const docRef = doc(db, "USERS", jwt);
      const userSnapshot = await getDoc(docRef);
      const currentConnectedUser = userSnapshot.data()?.collabs;
      if (currentConnectedUser) {
        const usersDataArray = await Promise.all(
          currentConnectedUser.map(async (userId) => {
            const userDocRef = doc(db, "USERS", userId);
            const userSnapshot = await getDoc(userDocRef);
            const userData = userSnapshot.data();
            const chatId = generateChatId(userId, auth.currentUser.uid);
            const chatIdHash = await generateSHA256Hash(chatId);
            return { ...userData, userId: userId, chatIdHash: chatIdHash };
          })
        );
        setUsers(usersDataArray);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  async function generateSHA256Hash(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  const generateChatId = (userId1, userId2) => {
    const ids = [userId1, userId2].sort();
    const chatId = ids.join("-");
    return chatId;
  };

  return (
    <main className="flex flex-col gap-5 mx-4 mt-6">
      {Users.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <Link to={`/chat/${item.chatIdHash}`}>
              <div className="flex items-center gap-8 border-[1.2px] border-zinc-800 p-3">
                <div>
                  <img
                    src={item.Pic}
                    className="object-cover w-20 h-20 rounded-full "
                    alt=""
                  />
                </div>
                <div className="space-y-2.5">
                  <h1 className="text-xl font-bold">{item.Name}</h1>
                  <p className="text-sm font-semibold ">{item.Profession}</p>
                </div>
              </div>
            </Link>
          </React.Fragment>
        );
      })}
    </main>
  );
}
