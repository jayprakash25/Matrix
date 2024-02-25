import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [oppUserData, setOppositeUser] = useState({});
  const photoURL = localStorage.getItem("UserPic");
  const { id } = useParams();
  const { uid, displayName } = auth.currentUser;

  const messageRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    await addDoc(messageRef, {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
      room: id,
      status: "delivered",
    });
    setMessage("");
  };

  const getOppositeUserId = () => {
    const userIds = id.split("-");
    return userIds.find((userId) => userId != uid);
  };

  const getOppUserData = async () => {
    const oppUserId = getOppositeUserId();
    const docRef = doc(db, "USERS", oppUserId);
    const userSnapshot = await getDoc(docRef);
    setOppositeUser(userSnapshot.data());
  };

  //mark messages as seen
  const messageSeen = async () => {
    const unseenMessageQuery = query(
      messageRef,
      where("room", "==", id),
      where("status", "==", "delivered"),
      where("uid", "!=", uid) // ---> not sent by current user
    );
    const querySnapshot = await getDocs(unseenMessageQuery);

    querySnapshot.forEach(async (document) => {
      const messageDocRef = doc(db, "messages", document.id);
      await updateDoc(messageDocRef, {
        status: "seen",
      });
    });
  };

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", id),
      orderBy("createdAt")
    );

    messageSeen();

    getOppUserData();

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      let updateSeenStatus = false;
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
        if (doc.data().status === "delivered" && doc.data().uid !== uid)
          updateSeenStatus = true;
      });

      setMessages(messages);

      if (updateSeenStatus) {
        messageSeen();
      }
    });

    return () => unsubscribe();
  }, [id, uid]);

  return (
    <>
      <div className="w-full fixed top-0 text-xl flex space-x-1 mb-4 items-center  pt-4 py-2 bg-[#383838] text-white font-medium rounded-b-md px-4">
        <div>
          <Link to={"/messages"}>
            <IoMdArrowRoundBack />
          </Link>
        </div>
        <div className="flex space-x-2 items-center">
          <img className="w-10 h-10  rounded-full" src={oppUserData.Pic} />
          <h1>{oppUserData.Name}</h1>
        </div>
      </div>
      <div className=" my-24  px-2.5">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${
              message.uid === uid
                ? " flex-row-reverse my-1"
                : "items-start my-4"
            }  gap-2.5`}
          >
            <img
              className="w-8 h-8 rounded-full"
              src={message.avatar}
              alt={`${message.name} image`}
            />
            <div className="flex flex-col gap-1 min-w-[4rem] max-w-[320px]">
              <div className="flex flex-col leading-1.5 p-4 py-3 border-gray-200 bg-[#282828] rounded-3xl">
                <p className="text-sm font-normal text-gray-900 dark:text-white">
                  {message.text}
                </p>
              </div>
              <span
                className={`text-sm w-full text-right justify-end   ${
                  message.uid === uid &&
                  messages.length - 1 === index &&
                  message.status === "seen"
                    ? "flex"
                    : "hidden"
                } font-normal text-[#bebebe]`}
              >
                {message.status}
              </span>
            </div>
          </div>
        ))}

        <div className="fixed w-full left-0 px-4 bottom-0 flex items-center justify-around py-2 space-x-3 ">
          <input
            type="text"
            placeholder="type you message here"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="w-full focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838]"
          />
          <button className="outline-none " onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
