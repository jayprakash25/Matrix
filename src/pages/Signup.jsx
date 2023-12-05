import Button from "../components/Signup/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../Firebase";
import { useId, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const provider = new GoogleAuthProvider();
  const UserToken = useId();
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });
  const GoogleSignIn = async () => {
    try {
      // const res = await signInWithPopup(auth, provider);
      // const User = {
      //   Name: res.user.displayName,
      //   email: res.user.email,
      //   pic: res.user.photoURL,
      // };
      // const docRef = doc(db, "Users", UserToken);
      // await setDoc(docRef, User);
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
        <input
          type="text"
          className="outline-none py-2.5 bg-slate-100 px-7"
          placeholder="Email"
        />
        <div className="flex items-center space-x-2">
          <p>In order to </p>
          <button className="rounded-full text-slate-500">Continue</button>
        </div>
      </div>
      <div className="flex items-start justify-center space-x-3 text-center text-slate-500">
        <span>--------------</span>
        <h1>OR</h1>
        <span>--------------</span>
      </div>
      <div className="px-2 py-5 space-y-6">
        <Button
          className="w-full outline-none "
          placeholder="Email/Phone Number"
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
    </div>
  );
}
