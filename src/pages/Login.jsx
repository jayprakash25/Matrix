import { useState } from "react";
import Button from "../components/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { Link, useNavigate } from "react-router-dom/dist";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      navigate("/home");
    } catch (error) {
      setLoading(false);
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
      console.log(error.code);
    }
  };

  return (
    <div className="items-center justify-center px-5 lg:flex lg:h-screen">
      {loading ? (
        <div className="flex items-center justify-center h-screen"></div>
      ) : (
        <div className="flex flex-col justify-center h-screen w-full lg:w-[35vw] lg:h-auto lg:p-6 lg:shadow-md lg:border">
          <div className="flex items-center justify-center w-full">
            {/* <img src="" className="w-20" alt="user" /> */}
          </div>
          <div className="flex flex-col items-center px-2 py-5 space-y-4 text-2xl font-semibold">
            <p className="text-center">
              Collab with <span className="text-[#1d9bf0]">People</span> with
              similar Hobbies
            </p>
            <form className="space-y-4" action="POST">
              <input
                type="email"
                className=" w-full focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838]"
                placeholder="Email"
                value={user.email}
                onChange={(e) => {
                  setUser({
                    ...user,
                    email: e.target.value,
                  });
                }}
              />
              <input
                type="password"
                value={user.password}
                className="w-full focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838]"
                placeholder="Password"
                onChange={(e) => {
                  setUser({
                    ...user,
                    password: e.target.value,
                  });
                }}
              />
              {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}
              <div className="py-5 space-y-6 ">
                <Button handleSubmit={submit} title="Login" />
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center space-x-2 text-center">
            <p>New User?</p>
            <Link to={"/"}>
              <p className=" text-[#1d9bf0] font-semibold">Sign-Up</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
