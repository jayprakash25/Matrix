import Button from "../components/Signup/Button";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";

export default function Signup() {
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
        <Button title="Continue with Google" logo={<GoogleIcon />} />
        <Button title="Continue with Apple" logo={<AppleIcon />} />
      </div>
    </div>
  );
}
