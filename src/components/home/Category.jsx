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
    <div className="px-6 mt-5 space-y-8">
      <div>
        <h1 className="text-xl font-bold">Categories</h1>
      </div>
      <div className="relative flex space-x-4 overflow-x-auto">
        {category.map((_, index) => {
          return (
            <div key={index} className="grid  text-[0.75rem] space-y-3">
              <div className="bg-[#282828] w-16 h-16 rounded-3xl flex items-center justify-center">
                <img className="w-7" src={_.icon} alt="" />
              </div>
              <div className="grid place-items-center place-content-center ">
                <p>{_.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
