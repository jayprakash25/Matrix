import { doc, setDoc } from "firebase/firestore";
import { useId, useState } from "react";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function EnterOtp({ user }) {
  const userjwt = useId();
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
      <div className="flex flex-col gap-8   w-[70vw] rounded-md px-5 py-9">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
          className="px-2 text-center border-b-2 outline-none "
        />
        <button
          onClick={createUser}
          className="py-2 text-sm  bg-gradient-to-r from-yellow-500 via-amber-600 to-amber-700  rounded-md"
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
