import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../Firebase";
import NotifyLoader from "./NotifyLoader";
import { RxCross2 } from "react-icons/rx";
import { TiTickOutline } from "react-icons/ti";
import Emptyimg from "../../images/Empty.png";
import { useAuth } from "../../ContextProvider/AuthContext";
import Loader from "../Loader";

export default function Notification() {
  const { currentUser } = useAuth();

  const jwt = currentUser.uid;
  const [isloading, setisloading] = useState(true);
 
  const [requests, setRequests] = useState([]);
  const [statusReq, setStatusReq] = useState([]);

  // const getNotifications = async () => {
  //   try {
  //     const docref = doc(db, "USERS", jwt);
  //     const User = await getDoc(docref);
  //     const userNotifications = User.data()?.notifications || [];
  //     setNotifications(userNotifications);
  //     setisloading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setisloading(false);
  //   }
  // };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "connectionRequests"), where("receiverId", "==", jwt), where("status", "==", "pending")),
      async (snapshot) => {
        const requestsPromises = snapshot.docs.map(async docSnap => {
          const requestData = docSnap.data();
          // console.log(requestData)
          const senderId = requestData.senderId;
          // Fetch sender's details
          const senderDocRef = doc(db, "USERS", senderId)
          const senderDoc = await getDoc(senderDocRef);
          return {
            id: docSnap.id,
            ...requestData,
            senderDetails: senderDoc.exists() ? senderDoc.data() : null,
          };
        });
  
        const requests = await Promise.all(requestsPromises);
        setRequests(requests); // Assuming you have a useState to store these requests
      }
    );
    setisloading(false);
  
    return () => unsubscribe();
  }, [jwt]);

  //to get notified about connection status
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "connectionRequests"), where("senderId", "==", jwt)),
      async(snapshot) => {
        const requestsPromises = snapshot.docs.map(async docSnap => {
          const requestData = docSnap.data();
          // console.log(requestData)
          const receiverId = requestData.receiverId;
          // Fetch sender's details
          const senderDocRef = doc(db, "USERS", receiverId)
          const senderDoc = await getDoc(senderDocRef);
          return {
            id: docSnap.id,
            ...requestData,
            receiverDetails: senderDoc.exists() ? senderDoc.data() : null,
          };
        });
  
        const requests = await Promise.all(requestsPromises);
        setStatusReq(requests);
        // Update the UI based on these requests and their status
      }
    );
    setisloading(false);
  
    return () => unsubscribe();
  }, [jwt]);
  

  console.log(requests)
  

  const handleAccept = async (requestId) => {
    // Logic to accept the request
    const requestRef = doc(db, "connectionRequests", requestId);
    await updateDoc(requestRef, {
      status: "accepted"
    });
    // Additional logic after accepting the request (e.g., update users' connections)
  };

  const handleDeny = async (requestId) => {
    // Logic to deny the request
    const requestRef = doc(db, "connectionRequests", requestId);
    await updateDoc(requestRef, {
      status: "denied"
    });
    // Any additional logic after denying the request
  };






  return (
    <>
  {/* {requests.length === 0 && (!statusReq || statusReq.length === 0) && (
  <div className="flex flex-col items-center mt-24 space-y-3 text-center">
    <img src={Emptyimg} alt="" className="w-60" />
    <h1 className="text-sm font-semibold">
      You don't have any Notifications!
    </h1>
  </div>
)} */}

      {/* {isaccept ? <Loader tittle={"Accepting collab"} /> : null} */}
      {isloading ? (
        <NotifyLoader />
      ) : (
        <main className="flex flex-col gap-4 mt-2">
           {requests?.map((_, i) => {
              return (
                <React.Fragment key={i}>
                  <div className="flex items-center justify-around gap-2 rounded-lg border-[1px] mx-4 p-3 border-zinc-800 shadow-lg shadow-zinc-900">
                    <div className="flex items-center gap-5">
                      <img
                        className="object-cover w-16 h-16 rounded-full"
                        src={_.senderDetails?.Pic}
                        alt=""
                      />
                      <div className="space-y-1">
                        <h1 className="text-lg font-bold">{_.senderDetails?.Name}</h1>
                        <p className="text-sm font-semibold">want&apos;s to connect with you</p>
                      </div>
                    </div>
                    <div className="flex gap-5">
                        <>
                          <RxCross2
                            onClick={() => {
                              handleDeny(_.id);
                            }}
                            size={25}
                            cursor={"pointer"}
                            color="red"
                          />
                          <TiTickOutline
                            onClick={() => {
                              handleAccept(_.id);
                            }}
                            size={25}
                            color="green"
                          />
                        </>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          {/* ) : (
            
          )} */}
          
            {statusReq?.map((_, i) => {
              return (
                <React.Fragment key={i}>
                  <div className="flex items-center justify-start gap-2 rounded-lg border-[1px] mx-4 p-3 border-zinc-800 shadow-lg shadow-zinc-900">
                    <div className="flex items-center gap-5">
                      <img
                        className="object-cover w-16 h-16 rounded-full"
                        src={_.receiverDetails?.Pic}
                        alt=""
                      />
                      <div className="space-y-1">
                        <h1 className="text-lg font-bold">{_.receiverDetails?.Name}</h1>
                        <p className="text-sm font-semibold text-green-600">{_.status === "accepted" && "accepted your request"}</p>
                        <p className="text-sm font-semibold text-red-500">{_.status === "denied" && "denied your request"}</p>
                        <p className="text-sm font-semibold">{_.status === "pending" && "your request is pending..."}</p>
                      </div>
                    </div>
                    
                  </div>
                </React.Fragment>
              );
            })}
          {/* ) : (
            <div className="flex flex-col items-center mt-24 space-y-3 text-cemt-11">
              <img src={Emptyimg} alt="" className="w-60" />
              <h1 className="text-sm font-semibold ">
                You dont have any Notifications !
              </h1>
            </div> */}
          {/* )} */}
        </main>
      )}
    </>
  );
}
