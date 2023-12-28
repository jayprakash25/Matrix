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
              As a <span className="text-slate-500">user</span>, I am entering
              my
            </p>
            <form className="space-y-4" action="POST">
              <input
                type="email"
                className=" outline-none text-lg w-full py-2.5 border border-b-2 px-5"
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
                className="outline-none w-full py-2.5 text-lg bg-slate-100 px-5"
                placeholder="Password"
                onChange={(e) => {
                  setUser({
                    ...user,
                    password: e.target.value,
                  });
                }}
              />
              <div className="px-2 py-5 space-y-6">
                <Button handleSubmit={submit} title="Login" />
              </div>
            </form>
          </div>

          <div className="flex text-sm items-center space-x-2 text-center justify-center">
            <p>Don&apos;t have an account?</p>
            <a className=" text-sm text-[#0064e0]" href="/">
              Sign-Up
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
