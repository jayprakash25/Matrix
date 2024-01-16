import { LuLoader2 } from "react-icons/lu";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 ">
      <LuLoader2 size={30} color="#1d9bf0" className="animate-spin" />
    </div>
  );
}
