import Button from "../components/Signup/Button";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";

export default function Signup() {
  return (
    <div className=" flex flex-col justify-center h-screen">
      <div className="py-5 space-y-4 font-semibold text-2xl flex flex-col items-center">
        <p>
          As a <span className="text-slate-500">user</span>, I am entering my
        </p>
        <input
          type="text"
          className="outline-none py-2.5 bg-slate-100 px-7"
          placeholder="Email/Phone Number"
        />
        <div className="flex space-x-2 items-center">
          <p>In order to </p>
          <button className="  text-slate-500 rounded-full">Continue</button>
        </div>
      </div>
      <div className="text-center text-slate-500 flex items-start justify-center space-x-3">
        <span>--------------</span>
        <h1>OR</h1>
        <span>--------------</span>
      </div>
      <div className="py-5 px-10 space-y-6">
        <Button title="Continue with Google" logo={<GoogleIcon />} />
        <Button title="Continue with Apple" logo={<AppleIcon />} />
      </div>
    </div>
  );
}
