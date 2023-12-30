import Button from "../components/Button";
import GoogleIcon from "@mui/icons-material/Google";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../Firebase";
import { useId, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const provider = new GoogleAuthProvider();
  const UserToken = useId();
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const GoogleSignIn = async () => {
    try {
      const currentUser = auth.currentUser;
      //
      const res = await signInWithPopup(auth, provider);
      if (!currentUser) {
        const User = {
          Name: res.user.displayName,
          email: res.user.email,
          pic: res.user.photoURL,
        };
        console.log(User);
        const docRef = doc(db, "Users", UserToken);
        await setDoc(docRef, User);
        navigate("/register");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SignIn = async () => {
    try {
      if (cred.password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long");
        return;
      }

      // Continue with Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        cred.email,
        cred.password
      );
      const newUser = userCredential.user;
      console.log(newUser);

      // const docRef = doc(db, "Users", UserToken);
      // await setDoc(docRef, cred);
      window.localStorage.setItem("jwt", UserToken);

      navigate("/register");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen px-5">
      <div className="flex flex-col items-center px-2 py-5 space-y-4 text-2xl font-semibold">
        <p>
          As a <span className="text-amber-500">user</span>, I am entering my
        </p>
        <form className="grid w-full space-y-4">
          <input
            type="email"
            value={cred.email}
            onChange={(e) => {
              setCred({ ...cred, email: e.target.value });
            }}
            className=" focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838]"
            placeholder="Email"
          />
          <input
            type="password"
            value={cred.password}
            onChange={(e) => {
              setCred({ ...cred, password: e.target.value });
            }}
            className=" focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838]"
            placeholder="New Password"
          />
          {errorMessage && (
            <div className="text-sm text-red-600">{errorMessage}</div>
          )}
          <input
            type="password"
            className=" focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838]"
            placeholder="Re-Enter Password"
          />
          <div className="flex items-center justify-center">
            <p>In order to </p>
            <button
              onClick={SignIn}
              className={`${
                cred.password.length >= 6 ? "bg-black text-white" : ""
              }  rounded-full text-amber-500 px-2 flex items-center text-lg py-2`}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
      <div className="flex items-start justify-center space-x-3 text-center text-slate-500">
        <span>--------------</span>
        <h1 className="text-amber-500">OR</h1>
        <span>--------------</span>
      </div>
      <div className="px-2 py-5 space-y-6">
        <Button
          title="Continue with Google"
          logo={<GoogleIcon />}
          handleSubmit={GoogleSignIn}
          value={cred.username}
          onChange={(e) => {
            setCred({
              ...cred,
              username: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex items-center justify-center font-poppins">
        <p>
          Already a user?{" "}
          <Link to={"/Login"}>
            <span className="font-semibold text-amber-500">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
