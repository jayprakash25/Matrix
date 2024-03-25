import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase";
import Loader from "../People/Loader";
import { RxCross2 } from "react-icons/rx";
import { TiTickOutline } from "react-icons/ti";
import { useAuth } from "../../ContextProvider/AuthContext";
import acceptLoader from "../Loader";
export default function Notification() {
  const { currentUser } = useAuth();
  const jwt = currentUser.uid;
  const [isloading, setisloading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [statusReq, setStatusReq] = useState([]);
  const [isaccept, setisaccept] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "connectionRequests"),
        where("receiverId", "==", jwt),
        where("status", "==", "pending")
      ),
      async (snapshot) => {
        setisloading(true);
        const requestsPromises = snapshot.docs.map(async (docSnap) => {
          const requestData = docSnap.data();
          // console.log(requestData)
          const senderId = requestData.senderId;
          // Fetch sender's details
          const senderDocRef = doc(db, "USERS", senderId);
          const senderDoc = await getDoc(senderDocRef);
          return {
            id: docSnap.id,
            ...requestData,
            senderDetails: senderDoc.exists() ? senderDoc.data() : null,
          };
        });

        const requests = await Promise.all(requestsPromises);
        setRequests(requests);
      }
    );
    setisloading(false);
    return () => unsubscribe();
  }, [jwt]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "connectionRequests"), where("senderId", "==", jwt)),
      async (snapshot) => {
        const requestsPromises = snapshot.docs.map(async (docSnap) => {
          const requestData = docSnap.data();
          const receiverId = requestData.receiverId;
          const senderDocRef = doc(db, "USERS", receiverId);
          const senderDoc = await getDoc(senderDocRef);
          return {
            id: docSnap.id,
            ...requestData,
            receiverDetails: senderDoc.exists() ? senderDoc.data() : null,
          };
        });
        const requests = await Promise.all(requestsPromises);
        setStatusReq(requests);
      }
    );
    setisloading(false);

    return () => unsubscribe();
  }, [jwt]);

  const handleAccept = async (requestId) => {
    setisaccept(true);
    const requestRef = doc(db, "connectionRequests", requestId);
    await updateDoc(requestRef, {
      status: "accepted",
    });
    setisaccept(false);
  };

  const handleDeny = async (requestId) => {
    const requestRef = doc(db, "connectionRequests", requestId);
    await updateDoc(requestRef, {
      status: "denied",
    });
  };

  return (
    <>
      {isaccept ? <acceptLoader tittle={"Accepting collab"} /> : null}
      {isloading ? (
        <div className="space-y-4">
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </div>
      ) : (
        <main className="flex flex-col gap-4 mt-2">
          {requests?.map((_, i) => {
            return (
              <React.Fragment key={i}>
                <div className="flex items-center justify-around gap-2 rounded-full border-[1px] mx-4 p-3 border-zinc-800 shadow-lg shadow-zinc-900">
                  <div className="flex items-center gap-5">
                    <img
                      className="object-cover w-16 h-16 rounded-full"
                      src={
                        !_.senderDetails?.Pic
                          ? "https://cdn-compiled-asset.piccollage.com/packs/media/assets/images/avatars/default-180e2e9af61799ca32e7da604646edd2.jpg"
                          : _.senderDetails?.Pic
                      }
                      alt=""
                    />
                    <div className="space-y-1">
                      <h1 className="text-lg font-bold">
                        {_.senderDetails?.Name}
                      </h1>
                      <p className="text-sm ">
                        want&apos;s to connect with you
                      </p>
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
          {statusReq?.map((_, i) => {
            return (
              <React.Fragment key={i}>
                <div className="flex items-center justify-start gap-2 rounded-full border-[1px] mx-4 p-3 border-zinc-800 shadow-lg shadow-zinc-900">
                  <div className="flex items-center gap-5">
                    <img
                      className="object-cover w-16 h-16 rounded-full"
                      src={
                        !_.receiverDetails?.Pic
                          ? "https://cdn-compiled-asset.piccollage.com/packs/media/assets/images/avatars/default-180e2e9af61799ca32e7da604646edd2.jpg"
                          : _.receiverDetails?.Pic
                      }
                      alt=""
                    />
                    <div className="space-y-1">
                      <h1 className="text-sm font-bold">
                        {_.receiverDetails?.Name}
                      </h1>
                      <p className="text-xs text-green-600">
                        {_.status === "accepted" && "accepted your request"}
                      </p>
                      <p className="text-xs text-red-500">
                        {_.status === "denied" && "denied your request"}
                      </p>
                      <p className="text-xs ">
                        {_.status === "pending" && "your request is pending..."}
                      </p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </main>
      )}
    </>
  );
}
