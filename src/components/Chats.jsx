import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../ContextProvider/AuthContext";

export default function Chats() {
  const { currentUser } = useAuth();

  const jwt = currentUser.uid;
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    const generateChatId = (userId1, userId2) => {
      const ids = [userId1, userId2].sort();
      const chatId = ids.join("-");
      return chatId;
    };
    const fetchConnectedUsers = async () => {
      try {
        const sentRequestsQuery = query(
          collection(db, "connectionRequests"),
          where("senderId", "==", jwt),
          where("status", "==", "accepted")
        );
        const receivedRequestsQuery = query(
          collection(db, "connectionRequests"),
          where("receiverId", "==", jwt),
          where("status", "==", "accepted")
        );
        const [sentRequestsSnapshot, receivedRequestsSnapshot] =
          await Promise.all([
            getDocs(sentRequestsQuery),
            getDocs(receivedRequestsQuery),
          ]);
        const connectedUserIds = new Set();
        sentRequestsSnapshot.forEach((doc) =>
          connectedUserIds.add(doc.data().receiverId)
        );
        receivedRequestsSnapshot.forEach((doc) =>
          connectedUserIds.add(doc.data().senderId)
        );

        const usersDataArray = await Promise.all(
          [...connectedUserIds].map(async (userId) => {
            const userDocRef = doc(db, "USERS", userId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
              const chatId = generateChatId(jwt, userId);
              return {
                userId,
                ...userDocSnap.data(),
                chatId,
              };
            } else {
              console.error("User not found:", userId);
              return null;
            }
          })
        );
        const filteredUsersDataArray = usersDataArray.filter(
          (user) => user !== null
        );
        setUsers(filteredUsersDataArray);
      } catch (error) {
        console.error("Error fetching connected users:", error);
      }
    };
    fetchConnectedUsers();
  }, [jwt]);

  // async function generateSHA256Hash(input) {
  //   const encoder = new TextEncoder();
  //   const data = encoder.encode(input);
  //   const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  //   const hashArray = Array.from(new Uint8Array(hashBuffer));
  //   const hashHex = hashArray
  //     .map((b) => b.toString(16).padStart(2, "0"))
  //     .join("");
  //   return hashHex;
  // }

  return (
    <main className="flex flex-col mx-2 mt-6 space-y-1">
      {Users.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <Link to={`/chat/${item.chatId}`}>
              <div className="flex items-center space-x-4 border-b-[1px] rounded border-zinc-800 p-3">
                <div>
                  <img
                    src={
                      item.Pic != null
                        ? item.Pic
                        : "https://cdn-compiled-asset.piccollage.com/packs/media/assets/images/avatars/default-180e2e9af61799ca32e7da604646edd2.jpg"
                    }
                    className="object-cover rounded-full w-14 h-14 "
                    alt=""
                  />
                </div>
                <div className="space-y-1">
                  <h1 className="font-semibold ">{item.Name}</h1>
                  <p className="text-sm font-semibold text-gray-400 ">
                    {item.Profession}
                  </p>
                </div>
              </div>
            </Link>
          </React.Fragment>
        );
      })}
    </main>
  );
}
