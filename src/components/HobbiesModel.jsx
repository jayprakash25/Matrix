import React, { useEffect, useState } from "react";
import hobbies from "../Data/Hobbies";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import Loader from "./Loader";

export default function HobbiesModel({ setisselect }) {
  const [Userhobbies, setUserHobbies] = useState([]);
  const [isloading, setisloading] = useState(true);
  const jwt = localStorage.getItem("jwt");
  const docref = doc(db, "USERS", jwt);

  const addHobbies = (hobby) => {
    if (!Userhobbies.includes(hobby)) {
      setUserHobbies([...Userhobbies, hobby]);
    } else {
      setUserHobbies(Userhobbies.filter((i) => i !== hobby));
    }
  };

  const getcurrenthobbies = async () => {
    try {
      const User = await getDoc(docref);
      setUserHobbies(User?.data()?.hobbies || []);
      setisloading(false);
    } catch (error) {
      console.log(error);
      setisloading(false);
    }
  };

  useEffect(() => {
    getcurrenthobbies();
  }, []);

  const saveHobbies = async (e) => {
    e.preventDefault();
    try {
      if (Userhobbies.length > 0) {
        await updateDoc(docref, { hobbies: Userhobbies });
        setisselect(false);
      } else {
        console.log("No hobbies selected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isloading ? <Loader /> : null}
      <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 backdrop-blur-md">
        <div className="p-6 rounded-xl bg-[#161616] w-[96vw]">
          {isloading ? <Loader /> : null}
          <div className="grid justify-center grid-cols-3 gap-3.5 px-3.5 mt-7 mb-5 place-items-center">
            {hobbies.map((hobby, i) => (
              <div
                key={i}
                onClick={() => addHobbies(hobby.name)}
                className={`${
                  Userhobbies.includes(hobby.name)
                    ? "bg-[#1d9bf0]  text-white ease-in-out duration-500"
                    : null
                }   cursor-pointer  text-center px-4 py-2 border-amber-500 rounded-full`}
              >
                <h1 className="text-sm font-semibold ">{hobby.name}</h1>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center my-10">
            <button
              onClick={saveHobbies}
              className="py-3   w-[70vw] text-white rounded-full bg-[#1d9bf0] "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
