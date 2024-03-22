import React, { useCallback, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Emptyimg from "../../images/Empty.png";
import { useAuth } from "../../ContextProvider/AuthContext";

export default function UserProfile({ userProfiles, search }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const jwt = currentUser.uid;
  const load = [1, 2, 3, 4, 5, 6, 7, 8, 10];
  const [connectedUserIds, setConnectedUserIds] = useState(new Set());
  const [isloading, setisloading] = useState(false);

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
        <>
          {userProfiles ? (
            <div className="grid  gap-y-3 px-2.5 mb-20">
              {userProfiles.map((user, index) => (
                <div
                  data-aos="fade-up"
                  className="bg-[#282828] p-5 rounded-full flex items-center justify-between"
                  key={index}
                >
                  {/* first section */}
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full w-14 h-14">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src={
                          user.Pic
                            ? user.Pic
                            : "https://cdn-compiled-asset.piccollage.com/packs/media/assets/images/avatars/default-180e2e9af61799ca32e7da604646edd2.jpg"
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <h1 className="text-[12px]">{user.Name}</h1>
                      <h1 className="text-[10px]">
                        {user.Bio?.split(" ").splice(0, 5).join(" ")}
                      </h1>
                    </div>
                  </div>
                  {/* button section  */}
                  <div>
                    <div className="flex justify-center">
                      {connectedUserIds.has(user.id) ? (
                        <button className="px-5 py-2 text-xs text-center text-white rounded-full border-[1px] border-blue-500">
                          Connected
                        </button>
                      ) : (
                        <button
                          className="px-4 py-2 text-xs text-center text-white bg-blue-500 rounded-full"
                          onClick={() => {
                            navigate(`/${user.id}`);
                          }}
                        >
                          View Profile
                        </button>
                      )}
                    </div>{" "}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center mt-20 space-y-3 text-cemt-11">
              <img src={Emptyimg} alt="" className="w-60" />
              <h1 className="text-sm font-semibold ">
                There are no people right now..
              </h1>
            </div>
          )}
        </>
      )}
    </>
  );
}

UserProfile.propTypes = {
  userProfiles: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
};
