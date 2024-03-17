import { Link } from "react-router-dom";
import hobbies from "../../Data/Hobbies";

export default function Category() {
  return (
    <div className="pl-2 mt-3">
      <div className="relative flex space-x-4 overflow-x-auto">
        {hobbies.map((_, index) => {
          return (
            <Link key={index} to={`/profile/${_.name}`}>
              <div className="grid  text-[0.75rem] space-y-3">
                <div className="bg-[#282828] w-16 h-16 rounded-3xl flex items-center justify-center">
                  {_.image}
                </div>
                <div className="grid place-items-center place-content-center text-[10px]">
                  <p>{_.name}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
