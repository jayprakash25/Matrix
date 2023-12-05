import React, { useState } from "react";
import { IoIosTimer } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function BottomSheet() {
  const [isshow, setisshow] = useState();

  const Profiles = [
    {
      image:
        "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg",
      Name: "Rahul",
      location: "Kompally",
    },
    {
      image:
        "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg",
      Name: "Rahul",
      location: "Kompally",
    },
    {
      image:
        "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg",
      Name: "Rahul",
      location: "Kompally",
    },
    {
      image:
        "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg",
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
          className={`bg-white   shadow-3xl rounded-t-2xl w-[100vw] overflow-x-auto h-[50vh] mt-7 animate__animated animate__slideInUp   ${
            isshow ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center mb-5 pt-7 px-14">
            <FaArrowLeftLong
              size={21}
              onClick={() => {
                setisshow(false);
              }}
              cursor={"pointer"}
              color={"black"}
            />
            <div className="border-b-4 w-[20vw] border-black mx-auto"></div>
          </div>

          <ul className="pt-5 space-y-6 px-14">
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
          <div className="flex items-center justify-between p-8 mt-8 bg-black rounded-t-xl">
            <div className="space-y-1">
              <p className="font-semibold text-slate-400">10/hour</p>
              <p className="text-xs font-semibold text-gray-200">
                Curent Package
              </p>
            </div>
            <button className="px-5 py-1.5 font-semibold text-sm text-black bg-white rounded-lg">
              Book
            </button>
          </div>
        </div>

        {/* Display Profiles */}
        <div
          className={`bg-gray-100 mt-7  shadow-3xl rounded-t-2xl  ${
            isshow ? "hidden" : "block"
          }`}
        >
          <div className="py-5 px-7">
            <h1 className="text-2xl font-bold text-slate-800">Ride Info</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 my-5">
            {Profiles.map((_, i) => {
              return (
                <React.Fragment key={i}>
                  <div className="flex items-center justify-between w-[100vw] px-5 cursor-pointer">
                    <div className="flex items-center gap-7">
                      <img
                        src={_.image}
                        className="object-cover rounded-full w-14 h-14"
                        alt=""
                      />
                      <div className="space-y-0.5">
                        <h1 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                          {_.Name}
                        </h1>
                        <p className="text-sm font-semibold text-slate-400">
                          10/hour
                        </p>
                      </div>
                    </div>
                    <button
                    className="bg-[#ddf2f3] text-black font-semibold  px-8 py-3.5 text-sm rounded-full"
                      onClick={() => {
                        setisshow(true);
                      }}
                    >
                      Book
                    </button>
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
