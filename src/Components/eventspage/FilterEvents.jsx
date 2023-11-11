import React from "react";
import { AllEventsCatgeory } from "./index";
export default function FilterEvents() {
  return (
    <div className="flex items-center justify-start gap-3 mt-5 ml-5 overflow-x-scroll">
      {AllEventsCatgeory.map((event, index) => {
        return (
          <React.Fragment key={index}>
            <div className="px-5 py-2 text-sm font-semibold rounded-full cursor-pointer bg-slate-100">
              {event}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
