import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import collegesInHyderabad from "../Data/cllg";
import { EnterOtp } from "./index";
export default function RegistrationForm() {
  const [isshow, setisshow] = useState(false);
  const [user, setuser] = useState({
    Name: "",
    Phone: "",
    age: "",
    location: "",
    collage: "",
    Profession: "",
    UserHobbies: [" "],
  });

  const configureCaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: () => {
          onNumSubmit();
        },
      });
    }
  };

  const onNumSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(user).every((i) => i != "")) {
      configureCaptcha();
      const phoneNumber = "+" + 91 + user.Phone;
      const appVerifier = window.recaptchaVerifier;
      await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then(async (confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setisshow(true);
          // await setDoc(doc(db, "USERS", id), user);
          // navigate("/hobbies");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please fill the form!");
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
    <>
      <div className="text-center mt-7">
        <h1 className="text-3xl font-semibold text-slate-800">
          Create <span className="text-slate-600">Account</span>
        </h1>
      </div>
      <form className="flex flex-col items-center justify-center gap-10 mt-10">
        <div className="relative">
          <label
            htmlFor="input"
            className="absolute top-0 px-2 -mt-2 text-sm text-gray-600 bg-white left-2"
          >
            Your Name
          </label>
          <input
            type="text"
            name="input"
            value={user.Name}
            onChange={(e) => {
              setuser({ ...user, Name: e.target.value });
            }}
            className="w-[80vw] py-2.5 px-5 transition duration-300 border rounded-full focus:outline-none focus:border-slate-800 border-gray-300"
          />
        </div>
        <div className="relative">
          <label
            htmlFor="input"
            className="absolute top-0 px-2 -mt-2 text-sm text-gray-600 bg-white left-2"
          >
            Phone
          </label>
          <input
            type="text"
            name="input"
            value={user.Phone}
            onChange={(e) => {
              setuser({ ...user, Phone: e.target.value });
            }}
            className="w-[80vw] py-2.5 px-5 transition duration-300 border rounded-full focus:outline-none focus:border-slate-800 border-gray-300"
          />
        </div>
        <div className="relative">
          <label
            htmlFor="input"
            className="absolute top-0 px-2 -mt-2 text-sm text-gray-600 bg-white left-2"
          >
            Age
          </label>
          <input
            type="text"
            name="input"
            value={user.age}
            onChange={(e) => {
              setuser({ ...user, age: e.target.value });
            }}
            className="w-[80vw] py-2.5 px-5 transition duration-300 border rounded-full focus:outline-none focus:border-slate-800 border-gray-300"
          />
        </div>
        <div className="relative">
          <label
            htmlFor="input"
            className="absolute top-0 px-2 -mt-2 text-sm text-gray-600 bg-white left-2"
          >
            Your location
          </label>
          <input
            onClick={getUserlocatiom}
            type="text"
            name="input"
            value={user.location}
            onChange={(e) => {
              setuser({ ...user, location: e.target.value });
            }}
            className="w-[80vw] py-2.5 px-5 transition duration-300 border rounded-full focus:outline-none focus:border-slate-800 border-gray-300"
          />
        </div>
        <div className="relative">
          <label
            htmlFor="input"
            className="absolute top-0 px-2 -mt-2 text-sm text-gray-600 bg-white left-2"
          >
            Your collage
          </label>
          <select
            value={user.collage}
            onChange={(e) => {
              setuser({ ...user, collage: e.target.value });
            }}
            className="w-[80vw] py-2.5 px-5 transition duration-300 border rounded-full focus:outline-none focus:border-slate-800 border-gray-300"
            name=""
            id=""
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
          <label
            htmlFor="input"
            className="absolute top-0 px-2 -mt-2 text-sm text-gray-600 bg-white left-2"
          >
            Your Profession
          </label>
          <input
            type="text"
            name="input"
            value={user.Profession}
            onChange={(e) => {
              setuser({ ...user, Profession: e.target.value });
            }}
            className="w-[80vw] py-2.5 px-5 transition duration-300 border rounded-full focus:outline-none focus:border-slate-800 border-gray-300"
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
            <span className="font-semibold text-slate-800">
              Term & Conditions
            </span>
          </Link>
        </p>
      </div>
      <div id="sign-in-button"></div>

      <div className="flex items-center justify-center my-10">
        <button
          onClick={onNumSubmit}
          className="w-[80vw] py-4  bg-black text-white rounded-full px-29 "
        >
          Create Account
        </button>
      </div>
      {isshow ? <EnterOtp user={user} /> : null}
    </>
  );
}
