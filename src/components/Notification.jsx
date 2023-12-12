import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

export default function Notification() {
  const Notifications = [
    {
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rahul",
    },
    {
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rahul",
    },
    {
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rahul",
    },
    {
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
      Name: "Rahul",
    },
  ];

  return (
    <main className="flex flex-col gap-4 mt-2">
      {Notifications.map((_, i) => {
        return (
          <React.Fragment key={i}>
            <div className="flex items-center justify-around gap-10 rounded-lg border-[1px] mx-4 p-3 border-gray-200">
              <div className="flex items-center gap-5">
                <img
                  className="object-cover w-16 h-16 rounded-full"
                  src={_.image}
                  alt=""
                />
                <div className="space-y-0.5">
                  <h1 className="text-lg font-bold">{_.Name}</h1>
                  <p className="text-sm text-slate-800 font-semibold">
                    Connected with you
                  </p>
                </div>
              </div>
              <AiOutlineDelete size={27} cursor={"pointer"} color="black" />
            </div>
          </React.Fragment>
        );
      })}
    </main>
  );
}
