import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../Firebase";

export default function Chat() {
  const [message, setMessage] = useState("");
  const messageRef = collection(db, "messages");
  let room = 2;
  const { uid, displayName, photoURL } = auth.currentUser;

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
      room,
    });
    setMessage("");
  };
  const [messages, setMessages] = useState([]);

  console.log(messages);

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.uid === uid ? " flex-row-reverse" : "items-start"
          }  gap-2.5`}
        >
          <img
            className="w-8 h-8 rounded-full"
            src={message.userProfilePic}
            alt={`${message.name} image`}
          />
          <div className="flex flex-col gap-1 w-[50vw] max-w-[320px]">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {message.name}
              </span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {/* {message.createdAt} */}
              </span>
            </div>
            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <p className="text-sm font-normal text-gray-900 dark:text-white">
                {message.text}
              </p>
            </div>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {/* {message.status} */}
              Delivered
            </span>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-around ">
        <input
          type="text"
          placeholder="type you message here"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="w-[70vw] focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838]"
        />
        <button className="outline-none" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
