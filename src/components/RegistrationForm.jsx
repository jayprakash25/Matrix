import React, { useState } from "react";
// import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function RegistrationForm() {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    Name: "",
    Phone: "",
    age: "",
    location: "",
    collage: "",
    Profession: "",
  });

  const createUser = async () => {
    try {
      // await setDoc(doc(db, "USERS", userjwt), user);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-8 text-center">
        <h1 className="text-3xl font-semibold text-slate-800">
          Create Account
        </h1>
      </div>

      <form className="flex flex-col items-center justify-center gap-10 mt-14">
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
            className="w-[80vw] py-2.5 px-5 transition duration-300 border rounded-full focus:outline-none focus:border-blue-500 border-gray-300"
          />
        </div>
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
              setuser({ ...user, Phone: e.target.value });
            }}
            className="w-[80vw] py-2.5 px-5 transition duration-300 border rounded-full focus:outline-none focus:border-blue-500 border-gray-300"
          />
        </div>
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
              setuser({ ...user, age: e.target.value });
            }}
            className="w-[80vw] py-2.5 px-5 transition duration-300 border rounded-full focus:outline-none focus:border-blue-500 border-gray-300"
          />
        </div>
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
              setuser({ ...user, location: e.target.value });
            }}
            className="w-[80vw] py-2.5 px-5 transition duration-300 border rounded-full focus:outline-none focus:border-blue-500 border-gray-300"
          />
        </div>
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
              setuser({ ...user, collage: e.target.value });
            }}
            className="w-[80vw] py-2.5 px-5 transition duration-300 border rounded-full focus:outline-none focus:border-blue-500 border-gray-300"
          />
        </div>
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
            value={user.Profession}
            onChange={(e) => {
              setuser({ ...user, Profession: e.target.value });
            }}
            className="w-[80vw] py-2.5 px-5 transition duration-300 border rounded-full focus:outline-none focus:border-blue-500 border-gray-300"
          />
        </div>
      </form>
      <div className="flex items-center mt-6 space-x-2 px-14">
        <input
          type="checkbox"
          name="input"
          className="transition duration-300 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
        />
        <p>
          Agree with{" "}
          <span className="font-semibold text-slate-800">
            Term & Conditions
          </span>
        </p>
      </div>
      <div className="flex items-center justify-center my-10">
        <button
          onClick={createUser}
          className="w-[80vw] p-3 text-white bg-blue-700 rounded-full px-29 "
        >
          Create Account
        </button>
      </div>
    </>
  );
}
