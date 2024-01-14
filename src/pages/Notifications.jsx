import { BottomBar } from "../components";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Notification from "../components/notifications/Notification";

export default function Notifications() {
  return (
    <>
      <nav className="p-4">
        <div className="flex items-center w-[60vw] justify-between">
          <div>
            <Link to={"/home"}>
              <FaArrowLeft size={20} color="#1d9bf0" />
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold">Notifications</h1>
          </div>
        </div>
      </nav>
      <Notification />
      <BottomBar />
    </>
  );
}
