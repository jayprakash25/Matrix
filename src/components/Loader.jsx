import { LuLoader2 } from "react-icons/lu";

export default function Loader({ tittle }) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center h-full gap-2 bg-black bg-opacity-75 flexcol ">
        <div>
          <LuLoader2 size={30} color="#1d9bf0" className="animate-spin" />
        </div>
        <p className="text-xs">{tittle ? tittle : "Please wait"}</p>
      </div>
    </>
  );
}
