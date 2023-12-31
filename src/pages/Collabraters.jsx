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
  const fetchUsercollabs = async () => {
    try {
      const User = await getDoc(docref);
      setcollabs(User.data().collabs || []);
      setisloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsercollabs();
  }, []);

  return (
    <>
      {isloading ? <NotifyLoader collabs={true} /> : null}
      <section className="flex flex-col gap-5 mt-5 mb-20">
        {collabs?.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <div className="flex items-center justify-around gap-10 rounded-lg border-[1px] mx-4 p-3 border-zinc-800 shadow-lg shadow-zinc-900">
                <div className="flex items-start gap-5">
                  <img
                    className="object-cover rounded-full w-28 h-28"
                    src={item.Pic}
                    alt={item.Pic}
                  />
                  <div className="space-y-2.5">
                    <h1 className="text-lg font-bold">{item.Name}</h1>
                    <p className="text-xs leading-5">{item.Bio}</p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <BottomBar />
      </section>
    </>
  );
}
