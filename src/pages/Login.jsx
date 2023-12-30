import { useState } from "react";
import Button from "../components/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom/dist";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const currentUser = auth.currentUser;
      const userToken = currentUser.uid;
      window.localStorage.setItem("jwt", userToken);
      console.log(userCredential);
      navigate("/home");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="px-5 lg:flex items-center justify-center lg:h-screen">
      {loading ? (
        // Display the loading spinner or GIF while content is loading
        <div className="flex  items-center justify-center h-screen">
          {/* <img className="w-20" src={loader} alt="Loading" /> */}
        </div>
      ) : (
        <div className="flex flex-col justify-center h-screen w-full lg:w-[35vw] lg:h-auto lg:p-6 lg:shadow-md lg:border">
          <div className="flex items-center justify-center w-full">
            <img src="" className="w-20" alt="user" />
          </div>
          <div className="flex flex-col items-center px-2 py-5 space-y-4 text-2xl font-semibold">
            <p className="text-center">
              {/* As a <span className="text-slate-500">user</span>, I am entering
              my */}
              Connect with students on your campus!
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
              <div className="  py-5 space-y-6">
                <Button handleSubmit={submit} title="Login" />
              </div>
            </form>
          </div>

          <div className="flex text-sm items-center space-x-2 text-center justify-center">
            <p>New User?</p>
            <a className=" text-sm " href="/">
              Sign-Up
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
