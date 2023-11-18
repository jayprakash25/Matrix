import Button from "../components/Signup/Button";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../Firebase";
import { useId } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const provider = new GoogleAuthProvider();
  const UserToken = useId();
  const navigate = useNavigate();

  const GoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      // console.log(res.user);
      const User = {
        Name: res.user.displayName,
        email: res.user.email,
        pic: res.user.photoURL,
      };

      const docRef = doc(db, "Users", UserToken);
      await setDoc(docRef, User);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col  justify-center h-screen">
      <div className="py-5 space-y-2 font-semibold text-2xl flex flex-col items-center">
        <p>As a user, I am entering my</p>
        <input
          type="text"
          className="outline-none py-2 w-full px-6"
          placeholder="Email/Phone Number/Personal ID"
        />
        <div className="flex space-x-2 items-center">
          <p>In order to </p>
          <button className="px-4 text-xl font-normal py-2 bg-[#DDF2FD] text-white rounded-full">
            continue
          </button>
        </div>
      </div>

      <div className="p-5 space-y-6">
        <Button
          handleSubmit={GoogleSignIn}
          title="Continue with Google"
          logo={<GoogleIcon />}
        />
        <Button title="Continue with Apple" logo={<AppleIcon />} />
      </div>
    </div>
  );
}
