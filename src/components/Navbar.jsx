import React from "react";

export default function Navbar() {
  const cat = ["Home", "Pool", "Events", "Profile"];

  return (
    <nav className="fixed  flex items-center justify-center w-full bottom-0 p-6">
      <div className="grid grid-cols-4 gap-4 bg-[#435585] p-4 rounded-full px-6 text-white">
        {cat.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <div className="cursor-pointer font-poppins">{item}</div>
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
