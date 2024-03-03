import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import {  db } from "../Firebase";
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
        // Define queries for sent and received accepted connection requests
        const sentRequestsQuery = query(collection(db, "connectionRequests"), where("senderId", "==", jwt), where("status", "==", "accepted"));

        const receivedRequestsQuery = query(collection(db, "connectionRequests"), where("receiverId", "==", jwt), where("status", "==", "accepted"));
  
        // Execute both queries concurrently
        const [sentRequestsSnapshot, receivedRequestsSnapshot] = await Promise.all([
          getDocs(sentRequestsQuery),
          getDocs(receivedRequestsQuery),
        ]);
  
        // Collect unique user IDs from both sets of requests
        const connectedUserIds = new Set();
        sentRequestsSnapshot.forEach(doc => connectedUserIds.add(doc.data().receiverId));
        receivedRequestsSnapshot.forEach(doc => connectedUserIds.add(doc.data().senderId));
  
        // Fetch user details and generate chat IDs for each connected user
        const usersDataArray = await Promise.all([...connectedUserIds].map(async userId => {
          const userDocRef = doc(db, "USERS", userId);
          const userDocSnap = await getDoc(userDocRef);
  
          if (userDocSnap.exists()) {
            // Generate a chat ID using both user IDs
            const chatId = generateChatId(jwt, userId);
  
            return { 
              userId, 
              ...userDocSnap.data(), 
              chatId // Include the generated chat ID in the user data object
            };
          } else {
            console.error("User not found:", userId);
            return null;
          }
        }));
  
        // Filter out any null results
        const filteredUsersDataArray = usersDataArray.filter(user => user !== null);
  
        // Update the state with the fetched users' data and their chat IDs
        setUsers(filteredUsersDataArray);
      } catch (error) {
        console.error("Error fetching connected users:", error);
      }
    };
  
    // Execute the fetch function
    fetchConnectedUsers();
  }, [jwt]); // Re-run if jwt or the generateChatId function changes
  

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



  console.log(Users);

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
                        : "https://firebasestorage.googleapis.com/v0/b/the-hub-97b71.appspot.com/o/6364b6fd26e2983209b93d18_ID_Playfal_DrawKit_Webflow_Display_2-min-png-934_2417--removebg-preview.png?alt=media&token=aa0f00e6-e1d5-4245-bfca-e5f6273ec980"
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
