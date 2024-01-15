import React, { useEffect, useState } from "react";
import { BottomBar } from "../components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import NotifyLoader from "../components/notifications/NotifyLoader";
export default function Collabraters() {
  const jwt = localStorage.getItem("jwt");
  const [isloading, setisloading] = useState(true);
  const [collabs, setcollabs] = useState();
  const docref = doc(db, "USERS", jwt);

  // fetching User collabs list
  const fetchUserCollabs = async () => {
    try {
      const user = await getDoc(docref);
      const currentConnectedUserCollabs = user.data()?.collabs || [];
      const collabUsersData = await Promise.all(
        currentConnectedUserCollabs.map(async (userId) => {
          const userDocRef = doc(db, "USERS", userId);
          const userDoc = await getDoc(userDocRef);
          const { Name, Pic, Phone, Bio, location, Profession } =
            userDoc?.data() || {};
          return { userId, Name, Pic, Phone, Bio, location, Profession };
        })
      );
      const collabsArray = collabUsersData;
      console.log(collabsArray);
      setcollabs(collabsArray);
      setisloading(false);
    } catch (error) {
      console.error(error);
      setisloading(false);
    }
  };

  useEffect(() => {
    fetchUserCollabs();
  }, []);

  return (
    <>
      {isloading ? (
        <NotifyLoader collabs={true} />
      ) : (
        <section className="flex flex-col gap-5 mt-5 mb-20">
          {collabs?.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <div className="flex items-center justify-around gap-10 rounded-lg border-[1px] mx-4 p-3 border-zinc-800 shadow-lg shadow-zinc-900">
                  <div className="flex items-start gap-5">
                    <div className="space-y-2.5">
                      <h1 className="text-lg font-bold">{item.Name}</h1>
                      <h1 className="font-semibold ">{item.Profession}</h1>
                      <p className="font-semibold ">{item.Phone}</p>
                      <p className="text-xs leading-6">{item.Bio}</p>
                      <p className="text-xs leading-6">{item.location}</p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </section>
      )}

      <BottomBar />
    </>
  );
}
