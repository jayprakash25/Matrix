import React from "react";

export default function UserProfile() {
  const Users = [
    {
      Banner:
        "https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=600",
      Profile:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      Name: "Rahul",
      Bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremqueLorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremque",
    },
    {
      Banner:
        "https://images.pexels.com/photos/316398/pexels-photo-316398.jpeg?auto=compress&cs=tinysrgb&w=600",
      Profile:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      Name: "Rahul",
      Bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremqueLorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremque",
    },
    {
      Banner:
        "https://images.pexels.com/photos/316398/pexels-photo-316398.jpeg?auto=compress&cs=tinysrgb&w=600",
      Profile:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      Name: "Rahul",
      Bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremqueLorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremque",
    },
    {
      Banner:
        "https://images.pexels.com/photos/316398/pexels-photo-316398.jpeg?auto=compress&cs=tinysrgb&w=600",
      Profile:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      Name: "Rahul",
      Bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremqueLorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vero corporis! Iste cupiditate doloremque",
    },
  ];

  return (
    <>
      {Users.map((_, i) => {
        return (
          <React.Fragment key={i}>
            <div className="w-[84vw] shadow-md shadow-gray-200">
              <div>
                <img
                  src={_.Banner}
                  className="rounded-t-lg border-t-[1px] border-gray-300"
                  alt=""
                />
              </div>
              <div className="flex justify-center -mt-9">
                <img
                  src={_.Profile}
                  className="object-cover w-16 h-16 rounded-full"
                  alt=""
                />
              </div>
              <div className="px-5 space-y-5 text-center bg-white py-7">
                <h1 className="text-xl font-bold text-slate-800">{_.Name}</h1>
                <p className="text-sm leading-6 text-slate-500">{_.Bio}</p>
                <button className="px-10 py-2 text-white bg-black rounded-lg w-[50vw] font-semibold">
                  Connect
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}
