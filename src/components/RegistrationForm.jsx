import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import collegesInHyderabad from "../Data/cllg";
import PopUp from "./models/PopUp";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useAuth } from "../ContextProvider/AuthContext";
export default function RegistrationForm() {
  // const [isshow, setisshow] = useState(false);
  const [fillForm, setFillForm] = useState(false);
  const navigate = useNavigate();

  const [user, setuser] = useState({
    Name: "",
    age: "",
    location: "",
    collage: "",
    Profession: "",
    Bio: " ",
  });

  const { currentUser, setIsNewUser } = useAuth();

  const userjwt = currentUser.uid;

  const createUser = async () => {
    try {
      if (
        user.Name !== "" &&
        user.age !== "" &&
        user.location !== "" &&
        user.collage !== "" &&
        user.Profession !== "" &&
        user.Bio !== ""
      ) {
        await setDoc(doc(db, "USERS", userjwt), user);
        setIsNewUser(false);
        navigate("/hobbies");
      } else {
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserlocatiom = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (location, err) => {
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&format=json`;
          const res = await fetch(url);
          const userPosition = res.json();
          userPosition.then((position) => {
            setuser({ ...user, location: position.display_name });
          });
          if (err) {
            alert("unexpected error Try again later");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div data-aos="fade-left">
      {fillForm ? (
        <PopUp
          setFillForm={setFillForm}
          text="Ensure all fields are filled out."
        />
      ) : null}
      <div className="text-center mt-7">
        <h1 className="text-3xl font-semibold ">
          Create <span className="text-[#1d9bf0]">Account</span>
        </h1>
      </div>
      <form className="flex flex-col items-center justify-center gap-10 mt-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Name"
            name="input"
            value={user.Name}
            onChange={(e) => {
              setuser({ ...user, Name: e.target.value });
            }}
            className="w-[90vw] focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838]"
          />
        </div>
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Phone"
            name="input"
            value={user.Phone}
            onChange={(e) => {
              setuser({ ...user, Phone: e.target.value });
            }}
            className="w-[90vw] focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838]"
          />
        </div> */}
        <div className="relative">
          <input
            type="text"
            name="input"
            placeholder="age"
            value={user.age}
            onChange={(e) => {
              setuser({ ...user, age: e.target.value });
            }}
            className="w-[90vw] focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838]"
          />
        </div>
        <div className="relative">
          <input
            onClick={getUserlocatiom}
            type="text"
            name="input"
            placeholder="location"
            value={user.location}
            onChange={(e) => {
              setuser({ ...user, location: e.target.value });
            }}
            className="w-[90vw] focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838]"
          />
        </div>
        <div className="relative">
          <select
            value={user.collage}
            onChange={(e) => {
              setuser({ ...user, collage: e.target.value });
            }}
            className="w-[90vw] focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838]"
          >
            {collegesInHyderabad.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <option value={item}>{item}</option>
                </React.Fragment>
              );
            })}
          </select>
        </div>
        <div className="relative">
          <input
            type="text"
            name="input"
            value={user.Profession}
            placeholder="Profession"
            onChange={(e) => {
              setuser({ ...user, Profession: e.target.value });
            }}
            className="w-[90vw] focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838]"
          />
        </div>
      </form>
      <div className="flex items-center mt-6 space-x-2 px-14">
        <input
          type="checkbox"
          name="input"
          className="transition duration-300 border border-gray-300 rounded-full focus:outline-none focus:border-slate-800"
        />
        <p>
          Agree with{" "}
          <Link to={"/privacy"}>
            <span className="font-semibold text-[#1d9bf0]">
              Term & Conditions
            </span>
          </Link>
        </p>
      </div>
      <div id="sign-in-button"></div>

      <div className="flex items-center justify-center my-10">
        <button
          onClick={createUser}
          className="w-[75vw] py-3  bg-[#1d9bf0]   text-white rounded-full px-29 "
        >
          Create Account
        </button>
      </div>
      {/* {isshow ? <EnterOtp user={user} /> : null} */}
    </div>
  );
}
