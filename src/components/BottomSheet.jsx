import React from "react";
import { PiDot } from "react-icons/pi";

export default function BottomSheet() {
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
      <div className="bg-[#0e1317] shadow-3xl rounded-t-2xl  h-[80vh] ">
        <div className="pt-7 px-7">
          <h1 className="text-2xl font-bold text-white">Your Destination</h1>
          <div className="flex flex-col items-start justify-start gap-1 pl-5 mt-10 text-white ">
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
        {/* Display Profiles */}
        <div className="bg-gray-100 mt-7 p-7 shadow-3xl rounded-t-2xl w-[100vw] overflow-x-auto">
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
                      <h1 className="text-lg font-bold text-slate-800">
                        {_.Name}
                      </h1>
                      <p className="text-sm font-semibold text-[#6d737b]">
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
