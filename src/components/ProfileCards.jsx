import AddIcon from "@mui/icons-material/Add";
import { profile } from "../assets";

export default function ProfileCards() {
  const profileData = [
    {
      pic: profile,
      name: "Sophia23",
      skill: "Dancer",
    },
    {
      pic: profile,
      name: "Sophia23",
      skill: "Developer",
    },
    {
      pic: profile,
      name: "Sophia23",
      skill: "Videography",
    },
    {
      pic: profile,
      name: "Sophia23",
      skill: "Content Creator",
    },
    {
      pic: profile,
      name: "Sophia23",
      skill: "AI",
    },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-2">
        {profileData.map((item, i) => {
          return (
            <div
              key={i}
              className={`flex ${
                i % 2 != 0 ? "pt-12" : ""
              } flex-col items-center`}
            >
              <img
                className="w-40 rounded-2xl h-48"
                src={item.pic}
                alt="profile.png"
              />
              <div className="w-full px-2 py-1">
                <div className="flex justify-between">
                  <p className="font-poppins font-semibold">{item.name}</p>
                  <AddIcon />
                </div>
                <p className="font-poppins text-sm">{item.skill}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
