import React, { useState } from "react";
import { IoIosTimer } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLocalPhone } from "react-icons/md";

export default function BottomSheet() {
  const [isshow, setisshow] = useState(true);
  const Profiles = [
    {
      image:
        "https://w7.pngwing.com/pngs/38/708/png-transparent-car-mercedes-car-love-compact-car-vehicle-thumbnail.png",
      Name: "Rahul",
      location: "Kompally",
    },
    {
      image:
        "https://w7.pngwing.com/pngs/38/708/png-transparent-car-mercedes-car-love-compact-car-vehicle-thumbnail.png",
      Name: "Rahul",
      location: "Kompally",
    },
    {
      image:
        "https://w7.pngwing.com/pngs/38/708/png-transparent-car-mercedes-car-love-compact-car-vehicle-thumbnail.png",
      Name: "Rahul",
      location: "Kompally",
    },
    {
      image:
        "https://w7.pngwing.com/pngs/38/708/png-transparent-car-mercedes-car-love-compact-car-vehicle-thumbnail.png",
      Name: "Rahul",
      location: "Kompally",
    },
    {
      image:
        "https://w7.pngwing.com/pngs/38/708/png-transparent-car-mercedes-car-love-compact-car-vehicle-thumbnail.png",
      Name: "Rahul",
      location: "Kompally",
    },
  ];

  return (
    <>
      <div className="bg-[#0e1317] shadow-3xl rounded-t-2xl h-[80vh]">
      <div className="border-b-4  py-5 w-[20vw] border-white mx-auto"></div>
        <div className="pt-7 px-7">
          <h1 className="text-2xl font-bold text-white">Your Destination</h1>
          <div className="flex flex-col items-start justify-center gap-1 pl-5 mt-10 text-white ">
            <div>
              <div className="flex items-center justify-between w-[70vw]">
                <h1 className="text-lg">Kompally</h1>
                <button className="border-[1px] px-8 py-1 rounded-lg text-sm">
                  Edit
                </button>
              </div>
              <p className="text-xs mt-0.5 text-[#6d737b] font-semibold">
                Starting location
              </p>
            </div>
            <div className="font-extralight">
              <p>|</p>
              <p>|</p>
              <p>|</p>
              <p>|</p>
              <p>|</p>
              <p>|</p>
              <p>|</p>
            </div>
            <div>
              <div className="flex items-center justify-between w-[70vw]">
                <p className="text-lg">Kandlakoya</p>
                <button className="border-[1px] px-8 py-1 rounded-lg text-sm">
                  Edit
                </button>
              </div>
              <p className="text-xs mt-0.5 text-[#6d737b] font-semibold">
                Destination
              </p>
            </div>
          </div>
        </div>
        {/* Details of the Ride */}
        <div
          className={`bg-white pt-7 px-14 shadow-3xl rounded-t-2xl w-[100vw] overflow-x-auto h-[50vh] mt-7 ${
            isshow ? "block" : "hidden"
          }`}
        >
          <div className="border-b-4  mb-5 w-[20vw] border-black mx-auto"></div>

          <ul className="space-y-6">
            <li className="flex items-start justify-between gap-5 ">
              <IoIosTimer
                color="black"
                className="border-[1px] border-slate-300 p-2 w-12 h-12 rounded-lg"
              />
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">Pick up Time</p>
                <h1 className="font-semibold text-slate-900">01:30</h1>
              </div>
            </li>
            <li className="flex items-start justify-between gap-5 ">
              <MdAttachMoney
                color="black"
                className="border-[1px] border-slate-300 p-2 w-12 h-12 rounded-lg"
              />
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">Total amount</p>
                <h1 className="font-semibold text-slate-900">01:30</h1>
              </div>
            </li>
            <li className="flex items-start justify-between gap-5 ">
              <IoPeopleSharp
                color="black"
                className="border-[1px] border-slate-300 p-2 w-12 h-12 rounded-lg"
              />
              <div className="space-y-1">
                <p className="font-bold text- text-slate-800">Passengers</p>
                <h1 className="font-semibold text-slate-900">2</h1>
              </div>
            </li>
            <li className="flex items-start justify-between gap-5 ">
              <MdOutlineLocalPhone
                color="black"
                className="border-[1px] border-slate-300 p-2 w-12 h-12 rounded-lg"
              />
              <div className="space-y-1">
                <p className="font-bold text- text-slate-800">Phone</p>
                <h1 className="font-semibold text-slate-900">8317680338</h1>
              </div>
            </li>
          </ul>
          <div className="my-10">
            <button className="w-full py-3 text-white bg-black rounded-lg">
              Book
            </button>
          </div>
        </div>

        {/* Display Profiles */}
        <div
          className={`bg-gray-100 mt-7 p-7 shadow-3xl rounded-t-2xl w-[100vw] overflow-x-auto ${
            isshow ? "hidden" : "block"
          }`}
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Ride Info</h1>
          </div>
          <div className="flex items-center mt-8 oveflow-x-scroll gap-11 ">
            {Profiles.map((_, i) => {
              return (
                <React.Fragment key={i}>
                  <div className="flex items-center justify-between gap-5 border-[1px] border-gray-300 rounded-lg  p-3.5 cursor-pointer">
                    <div>
                      <img src={_.image} className="max-w-[35vw]" alt="" />
                    </div>
                    <div className="space-y-2">
                      <h1 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                        <CgProfile size={20} color="black" />
                        {_.Name}
                      </h1>
                      <p className="text-sm flex gap-2 items-center font-semibold text-[#6d737b]">
                        <IoLocationOutline size={20} color="black" />{" "}
                        {_.location}
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
