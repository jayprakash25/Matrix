import React from "react";
import { AllEventsCatgeory } from "./index";
export default function FilterEvents() {
  return (
    <div className="flex items-center justify-start gap-3 mt-5 ml-5 overflow-x-scroll">
      {AllEventsCatgeory.map((event, index) => {
        return (
          <React.Fragment key={index}>
            <div className="px-5 py-2 text-sm font-semibold bg-gray-100 rounded-full cursor-pointer text-slate-700">
              {event}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
