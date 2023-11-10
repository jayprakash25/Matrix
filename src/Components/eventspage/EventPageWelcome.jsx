import React from "react";

export default function EventPageWelcome() {
  return (
    <body
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)) , url("https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=600")`,
        backgroundPosition: "center center",
        width: "100vw",
        height: "100vh",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="fixed bottom-24 left-9">
        <div className="text-white max-w-sm space-y-7">
          <h1 className="text-3xl font-semibold">
            Lorem ipsum dolor sit amet.
          </h1>
          <p className="leading-9 font-light text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab,
            obcaecati!
          </p>
          <button className="text-white bg-gradient-to-r from-pink-500 via-red-600 to-orange-500 px-24 py-3 rounded-md text-sm">
            Explore Events
          </button>
        </div>
      </div>
    </body>
  );
}
