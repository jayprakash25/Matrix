import React from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineArrowLeftt } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";

export default function BookEvents() {
  const event = useLocation();

  const { image, Tittle, date, location, about } = event.state;

  return (
    <>
      <header>
        <div className="absolute w-screen px-5 text-white top-5">
          <div className="flex items-center gap-7">
            <AiOutlineArrowLeft size={20} color={"white"} />
            <h1 className="text-lg font-semibold">{Tittle}</h1>
          </div>
        </div>
        <img
          src={image}
          className="w-[100vw]  h-[40vh] object-cover"
          alt={image}
        />
      </header>
      <main className="px-10">
        <div className="mt-5 ">
          <h1 className="max-w-sm text-3xl font-semibold leading-normal">
            International Band Music Concert
          </h1>
          <div className="mt-8 space-y-7">
            <div className="flex items-center gap-x-3">
              <SlCalender
                color="#6c7af7"
                className="bg-[#eceefb]  w-12 h-12 p-3 rounded-full"
              />
              <div className="space-y-2">
                <h1 className="text-xl font-semibold text-slate-700">{date}</h1>
                <p>All are welcome.</p>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <IoLocationOutline
                color="#6c7af7"
                className="bg-[#eceefb]  w-12 h-12 p-3 rounded-full"
              />
              <div className="space-y-2">
                <h1 className="text-xl font-semibold text-slate-700">
                  {location}
                </h1>
                <p>Near the Sri chaitanya Collage Hyderabad</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 space-y-3">
          <h1 className="text-2xl font-semibold text-slate-700">About Event</h1>
          <p className="text-sm leading-6 text-gray-600">{about}</p>
        </div>
      </main>
      <footer className="flex justify-center">
        <div className="fixed bottom-5">
          <button className="bg-[#5669fe] flex items-center text-center justify-center gap-x-5 font-semibold rounded-md text-white px-20 py-3.5 hover:brightness-75 ease-in-out duration-300">
            <h1>Book your Ticket</h1>
          </button>
        </div>
      </footer>
    </>
  );
}
