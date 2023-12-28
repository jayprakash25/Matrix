import { useEffect, useState } from "react";
import hobbies from "../Data/Hobbies";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";

export default function SelectHobbies() {
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [Userhobbies, setUserHobbies] = useState([]);
  const navigate = useNavigate();
  const toggleSelection = (index) => {
    if (selectedHobbies.includes(index)) {
      setSelectedHobbies(selectedHobbies.filter((i) => i !== index));
    } else {
      setSelectedHobbies([...selectedHobbies, index]);
    }
  };

  const addHobbies = (hobby) => {
    if (!Userhobbies.includes(hobby)) {
      setUserHobbies([...Userhobbies, hobby]);
    } else {
      setUserHobbies(Userhobbies.filter((i) => i !== hobby));
    }
  };

  const saveHobbies = async (e) => {
    e.preventDefault();
    try {
      if (!Userhobbies == "") {
        await addDoc(collection(db, "User-Hobbies"), { hobbies: Userhobbies });
        alert("Success");
      }
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(Userhobbies);
  }, [Userhobbies]);

  return (
    <>
      <div className="px-8 pt-8 space-y-4">
        <h1 className="text-5xl">Hello.</h1>
        <p className="text-sm">
          Pick your favorite Hobbies to set up your feed
        </p>
      </div>

      <main className="grid justify-center grid-cols-3 gap-4 px-3.5 mt-8 mb-5 place-items-center">
        {hobbies.map((hobby, i) => (
          <div
            key={i}
            onClick={() => {
              toggleSelection(i);
              addHobbies(hobby);
            }}
            className={`${
              selectedHobbies.includes(i)
                ? "bg-black text-white ease-in-out duration-500"
                : null
            } border-[1px] cursor-pointer w-[7.5rem] text-center px-6 py-2 border-slate-800 rounded-full`}
          >
            <h1>{hobby}</h1>
          </div>
        ))}
      </main>
      <div className="flex items-center justify-center my-10">
        <button
          onClick={saveHobbies}
          className=" py-4  bg-black text-white rounded-full px-24 "
        >
          Next
        </button>
      </div>
    </>
  );
}
