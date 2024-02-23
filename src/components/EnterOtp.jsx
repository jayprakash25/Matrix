import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../ContextProvider/AuthContext";

export default function EnterOtp({ user }) {
  const { currentUser } = useAuth();

  const userjwt = currentUser.uid;
  const [otp, setOtp] = useState("");
  // const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      const code = otp;
      if (window.confirmationResult) {
        window.confirmationResult
          .confirm(code)
          .then(async () => {
            // alert("Number is verified!");
            // setSuccess(true);
            localStorage.setItem("jwt", userjwt);
            await setDoc(doc(db, "USERS", userjwt), user);
            navigate("/hobbies");
          })
          .catch((error) => {
            console.log(error);
            alert("Invalid OTP, Try Again!");
          });
      } else {
        console.error("Confirmation result is not available.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* {success ? (
        <PopUp setFillForm={setSuccess} text="Login Successful! You're in" />
      ) : null} */}
      <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 backdrop-blur-md">
        <div className="flex flex-col gap-8 bg-[#161616] space-y-3   w-[90vw] rounded-xl px-8 py-16">
          <input
            type="number"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            className="px-2 py-3 text-xl text-center text-black border-b-2 outline-none rounded-xl "
          />
          <button
            onClick={createUser}
            className="py-2 text-sm  bg-[#1d9bf0] rounded-full"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}

EnterOtp.propTypes = {
  user: PropTypes.object.isRequired,
};
