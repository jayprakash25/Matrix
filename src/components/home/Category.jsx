import { sports, tech } from "../../assets/home";

export default function Category() {
  const category = [
    {
      icon: sports,
      name: "Sports",
    },
    {
      icon: tech,
      name: "Technology",
    },
    {
      icon: "",
      name: "Arts",
    },
    {
      icon: "",
      name: "Social",
    },
    {
      icon: "",
      name: "Social",
    },
    {
      icon: "",
      name: "Social",
    },
    {
      icon: "",
      name: "Social",
    },
    {
      icon: "",
      name: "Social",
    },
  ];
  return (
    <div className="px-6 py-[4.5rem] space-y-8">
      <div>
        <h1 className="text-lg font-semibold">Categories</h1>
      </div>
      {/* <div className="flex items-center "> */}
      <div className="flex space-x-4 relative overflow-x-auto">
        {category.map((_, index) => {
          return (
            <div key={index} className="grid  text-[0.75rem] space-y-3">
              <div className="bg-[#282828] w-16 h-16 rounded-3xl flex items-center justify-center">
                <img className="w-7" src={_.icon} alt="" />
              </div>
              <div className="place-items-center place-content-center grid ">
                <p>{_.name}</p>
              </div>
            </div>
          );
        })}
        {/* <div className="flex items-center justify-center absolute right-0 top-[35%]  ">
          <img src={right} alt="" />
        </div> */}
      </div>

      {/* </div> */}
    </div>
  );
}
