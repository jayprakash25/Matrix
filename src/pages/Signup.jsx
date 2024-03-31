import Button from "../components/Button";
import GoogleIcon from "@mui/icons-material/Google";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../Firebase";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../ContextProvider/AuthContext";

export default function Signup() {
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const { setIsNewUser } = useAuth();

  // const jwt = currentUser.uid;

  const GoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      await handleUserAfterAuth(res.user);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  const SignIn = async (e) => {
    e.preventDefault();
    if (cred.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        cred.email,
        cred.password
      );
      setIsNewUser(true);

      await handleUserAfterAuth(res.user);
    } catch (error) {
    console.error(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage(
            "The email address is already in use by another account."
          );
          break;
        case "auth/weak-password":
          setErrorMessage(
            "Password is too weak. Please use a stronger password."
          );
          break;
        case "auth/invalid-email":
          setErrorMessage("The email address is not valid.");
          break;
        default:
          setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleUserAfterAuth = async (user) => {
    if (user) {
      const UserToken = user.uid;
      const docRef = doc(db, "USERS", UserToken);
      const userSnapshot = await getDoc(docRef);

      if (!userSnapshot.exists()) {
        const newUser = {
          Name: user.displayName || "",
          email: user.email,
          pic: user.photoURL || "",
        };
        console.log(newUser);
        await setDoc(docRef, newUser);
        navigate("/register");
      } else {
        setIsNewUser(false);
        navigate("/home");
      }
    }
  };

  // Placeholder function for push notifications
  // const sendPushNotification = () => {};

  // useEffect(() => {
  //   if (currentUser) {
  //     navigate("/home");
  //   }
  // }, []);

  return (
    <div data-aos="fade-in" className="flex flex-col justify-center h-screen px-5">
      <div className="flex flex-col items-center px-2 py-5 space-y-4 text-2xl font-semibold">
        <p>
          As a <span className="text-[#1d9bf0]">user</span> , I am entering my
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
          <div className="flex items-center justify-center space-x-2">
            <p>In order to </p>
            <button
              onClick={SignIn}
              className={`${
                cred.password.length >= 6
                  ? "bg-[#1d9bf0]  px-4 py-2 rounded-full  text-white"
                  : ""
              }   text-[#1d9bf0] font-semibold   flex items-center text-lg `}
            >
              continue
            </button>
          </div>
        </form>
      </div>
      <div className="flex items-start justify-center space-x-3 text-center text-slate-500">
        <span>--------------</span>
        <h1 className="text-[#1d9bf0]">OR</h1>
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
            <span className="font-semibold text-[#1d9bf0] ">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
