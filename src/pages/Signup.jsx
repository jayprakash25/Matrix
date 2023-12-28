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
      const res = await signInWithPopup(auth, provider);
      const User = {
        Name: res.user.displayName,
        email: res.user.email,
        pic: res.user.photoURL,
      };
      const docRef = doc(db, "Users", UserToken);
      await setDoc(docRef, User);
      navigate("/register");
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
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-col items-center px-3 py-5 space-y-4 text-2xl font-semibold">
        <p>
          As a <span className="text-slate-500">user</span>, I am entering my
        </p>
        <form className="grid space-y-4">
          <input
            type="email"
            value={cred.email}
            onChange={(e) => {
              setCred({ ...cred, email: e.target.value });
            }}
            className="outline-none py-2.5 bg-slate-100 px-7"
            placeholder="Email"
          />
          <input
            type="password"
            value={cred.password}
            onChange={(e) => {
              setCred({ ...cred, password: e.target.value });
            }}
            className="outline-none py-2.5 bg-slate-100 px-7"
            placeholder="New Password"
          />
          {errorMessage && (
            <div className="text-sm text-red-600">{errorMessage}</div>
          )}
          <input
            type="password"
            className="outline-none py-2.5 bg-slate-100 px-7"
            placeholder="Re-Enter Password"
          />
          <div className="flex items-center justify-center space-x-2 px-3">
            <p>In order to </p>
            <button
              onClick={SignIn}
              className={`${
                cred.password.length >= 6 ? "bg-black text-white" : ""
              }  rounded-full text-slate-500 px-5 flex items-center text-lg py-2`}
            >
              continue
            </button>
          </div>
        </form>
      </div>
      <div className="flex items-start justify-center space-x-3 text-center text-slate-500">
        <span>--------------</span>
        <h1>OR</h1>
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
            <span className="font-semibold">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
