import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function EnterOtp({ user }) {
  const userjwt = window.localStorage.getItem("jwt");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      const code = otp;
      if (window.confirmationResult) {
        window.confirmationResult
          .confirm(code)
          .then(async () => {
            alert("Number is verified!");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 backdrop-blur-md">
      <div className="flex flex-col gap-8 bg-[#161616] space-y-3   w-[90vw] rounded-xl px-8 py-16">
        <input
          type="number"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
          className="px-2 py-3 text-black text-xl text-center border-b-2 rounded-xl outline-none "
        />
        <button
          onClick={createUser}
          className="py-2 text-sm  bg-gradient-to-r from-yellow-500 via-amber-600 to-amber-700  rounded-xl"
        >
          Done
        </button>
      </div>
    </div>
  );
}

EnterOtp.propTypes = {
  user: PropTypes.object.isRequired,
};
