import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function BookEvents() {
  const event = useLocation();

  const { image, Tittle, date, location, about } = event.state;

  return (
    <body>
      <header>
        <div className="absolute w-screen px-5 text-white top-5">
          <div className="flex items-center gap-7">
            <Link to={"/events"}>
              <AiOutlineArrowLeft size={20} color={"white"} />
            </Link>
            <h1 className="text-lg font-semibold">{Tittle}</h1>
          </div>
        </div>
        <img
          src={image}
          className="w-[100vw]  h-[40vh] object-cover"
          alt={image}
        />
      </header>
      <main className="">
        <div className="px-10 mt-5">
          <h1 className="max-w-sm text-3xl font-semibold leading-normal text-slate-700">
            International Band Music Concert
          </h1>
          <div className="mt-8 space-y-7 ">
            <div className="flex items-center gap-x-3">
              <SlCalender
                color="#6c7af7"
                className="bg-[#eceefb]  w-11 h-11 p-3 rounded-full"
              />
              <div className="space-y-2">
                <h1 className="text-lg font-semibold text-slate-700">{date}</h1>
                <p className="text-sm text-gray-600">All are welcome.</p>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <IoLocationOutline
                color="#6c7af7"
                className="bg-[#eceefb]  w-11 h-11 p-3 rounded-full"
              />
              <div className="space-y-2">
                <h1 className="text-lg font-semibold text-slate-700">
                  {location}
                </h1>
                <p className="text-sm text-gray-600">
                  Near the Sri chaitanya Collage Hyderabad
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 mt-10 space-y-3 mb-">
          <h1 className="text-2xl font-semibold text-slate-700">About Event</h1>
          <p className="text-xs leading-6 text-gray-600 ">{about}</p>
        </div>
      </main>
      <section className="flex justify-center my-5">
        <button className="bg-blue-600 flex items-center text-center justify-center gap-x-5 font-semibold rounded-md text-white px-28 py-3.5 hover:brightness-75 ease-in-out duration-300 text-sm">
          <h1>Book my Ticket</h1>
        </button>
      </section>
    </body>
  );
}
