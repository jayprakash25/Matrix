import { Link } from "react-router-dom";
import hobbies from "../../Data/Hobbies";

export default function Category() {
  return (
    <div className="px-6 mt-5 space-y-8">
      <div>
        <h1 className="text-xl font-bold">Categories</h1>
      </div>
      <div className="relative flex space-x-4 overflow-x-auto">
        {hobbies.map((_, index) => {
          return (
            <Link key={index} to={`/profile/${_.name}`}>
              <div className="grid  text-[0.75rem] space-y-3">
                <div className="bg-[#282828] w-16 h-16 rounded-3xl flex items-center justify-center">
                  <img className="w-7" src={_.image} alt="" />
                </div>
                <div className="grid place-items-center place-content-center ">
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
