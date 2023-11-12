import React from "react";
import { Link } from "react-router-dom";

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
      <div className="absolute bottom-0 p-5 bg-black bg-opacity-50">
        <div className="px-5 space-y-6 text-center text-white">
          <h1 className="text-3xl font-semibold leading-10">
            Explore the Events in your City
          </h1>
          <p className="font-light leading-9 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab,
            obcaecati! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Ab, obcaecati!
          </p>
          <Link to="/events">
            <button className="py-3 text-sm text-white rounded-full px-28 mt-7 bg-gradient-to-r from-pink-600 via-red-500 to-red-600">
              Explore Events
            </button>
          </Link>
        </div>
      </div>
    </body>
  );
}
