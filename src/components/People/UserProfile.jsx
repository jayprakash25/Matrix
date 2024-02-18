import React, { useCallback, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Emptyimg from "../../images/Empty.png";

export default function UserProfile({ userProfiles, search }) {
  const jwt = localStorage.getItem("jwt");
  const load = [1, 2, 3, 4, 5, 6, 7, 8, 10];
  const [connectedUserIds, setConnectedUserIds] = useState(new Set());
  const [isloading, setisloading] = useState(true);
  const navigate = useNavigate();

  const fetchConnectedUsers = useCallback(async () => {
    try {
      const userDoc = await getDoc(doc(db, "USERS", jwt));
      const collabs = userDoc?.data()?.collabs || [];
      setConnectedUserIds(new Set(collabs));
      setisloading(false);
    } catch (error) {
      console.error("Error fetching connected users:", error);
      setisloading(false);
    }
  }, [jwt]);

  useEffect(() => {
    fetchConnectedUsers();
  }, [fetchConnectedUsers]);

  return (
    <>
      {isloading ? (
        <div className="flex flex-col gap-4 ">
          {Array.from(load, (index) => (
            <Loader key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 gap-y-3 px-2.5 mb-20">
          {userProfiles.length > 0 ? (
            userProfiles.map((user, index) => (
              <div
                key={index}
                className={`flex flex-col justify-center border-[2px] border-zinc-800 p-4 rounded-lg px-2 ${
                  connectedUserIds.has(user.id) ? "connected" : ""
                }`}
              >
                <div>
                  {user.Pic == "" || user.Pic == null ? (
                    <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/the-hub-97b71.appspot.com/o/6364b6fd26e2983209b93d18_ID_Playfal_DrawKit_Webflow_Display_2-min-png-934_2417--removebg-preview.png?alt=media&token=aa0f00e6-e1d5-4245-bfca-e5f6273ec980" ||
                        user.Pic
                      }
                      className="object-cover mx-auto rounded-full w-24 h-24"
                      alt={null}
                    />
                  ) : (
                    <img
                      src={user.Pic}
                      className="object-cover mx-auto rounded-full w-24 h-24"
                      alt={user.Pic}
                    />
                  )}
                </div>
                <div className="mt-2.5 space-y-5">
                  <h1 className="text-lg font-bold text-center">{user.Name}</h1>
                  <p className="text-center text-[13.5px]">{user.Bio}</p>
                  <ul className="flex overflow-x-scroll max-w-xs  gap-2 mx-auto">
                    {user.hobbies?.map((hobby, hobbyIndex) => (
                      <li
                        key={hobbyIndex}
                        className="text-[11px] px-3 font-semibold text-center rounded-full py-1.5 bg-sky-600"
                      >
                        {hobby}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-center">
                    {connectedUserIds.has(user.id) ? (
                      <button className="px-10 py-2 text-xs text-center text-white rounded-full border-[1px] border-blue-500">
                        Connected
                      </button>
                    ) : (
                      <button
                        className="px-10 py-2 text-xs text-center text-white bg-blue-500 rounded-full"
                        onClick={() => {
                          navigate(`/${user.id}`);
                        }}
                      >
                        View Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center mt-20 space-y-3 text-cemt-11">
              <img src={Emptyimg} alt="" className="w-60" />
              <h1 className="text-sm font-semibold ">
                There are no people right now..
              </h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}

UserProfile.propTypes = {
  userProfiles: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
};
