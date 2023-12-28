import { GiNothingToSay } from "react-icons/gi";

export default function Empty() {
  return (
    <div className="flex flex-col items-center space-y-3 text-center mt-36">
      <GiNothingToSay size={80} color="black" />
      <h1 className="text-sm font-semibold text-slate-500">
        No Posts Connect to See
      </h1>
    </div>
  );
}
