import { Link } from "react-router-dom";
import Emptyimg from "../../images/Empty.png";
export default function Empty() {
  return (
    <div className="flex flex-col items-center mt-24 space-y-3 text-center">
      <img src={Emptyimg} alt="" className="w-60" />
      <h1 className="font-semibold text-[14.6px] ">
        No Posts{" "}
        <span className="text-[#1d9bf0] cursor-pointer">
          <Link to="/people">Connect</Link>
        </span>{" "}
        to See
      </h1>
    </div>
  );
}
