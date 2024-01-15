import { GiNothingToSay } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Empty() {
  return (
    <div className="flex flex-col items-center space-y-3 text-center mt-36">
      <GiNothingToSay size={90} color="#252424" />
      <h1 className="text-sm font-semibold ">
        No Posts{" "}
        <span className="text-[#1d9bf0] cursor-pointer">
          <Link to="/people">Connect</Link>
        </span>{" "}
        to See
      </h1>
    </div>
  );
}
