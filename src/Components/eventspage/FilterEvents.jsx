import React, { useState } from "react";
import { AllEventsCatgeory } from "./index";
export default function FilterEvents({ setfilterevent }) {
  const [isselect, setisselect] = useState(null);

  const Toogle = (index) => {
    setisselect(index === isselect ? null : index);
  };

  return (
    <>
      <div className="flex items-center justify-start gap-3 mt-5 ml-5 overflow-x-scroll">
        {AllEventsCatgeory.map((event, index) => {
          return (
            <React.Fragment key={index}>
              <div
                onClick={() => {
                  Toogle(index);
                  setfilterevent(event);
                }}
                className={`px-5 py-2 text-sm font-semibold text-slate-700 rounded-full cursor-pointer select-none ease-in-out duration-200  ${
                  isselect === index ? "bg-blue-500 text-white" : "bg-gray-100"
                } `}
              >
                {event}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
