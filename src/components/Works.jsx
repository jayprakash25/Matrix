import React from "react";
import { CiLock } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";

export default function Works({ id }) {
  const jwt = localStorage.getItem("jwt");

  const works = [
    {
      Para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nemo consequuntur quidem minima non placeat at sequi. Excepturi omnis voluptas ad, ",
    },
    {
      Para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nemo consequuntur quidem minima non placeat at sequi. Excepturi omnis voluptas ad, ",
    },
    {
      Para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nemo consequuntur quidem minima non placeat at sequi. Excepturi omnis voluptas ad, ",
    },
    {
      Para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nemo consequuntur quidem minima non placeat at sequi. Excepturi omnis voluptas ad, ",
    },
    {
      Para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nemo consequuntur quidem minima non placeat at sequi. Excepturi omnis voluptas ad, ",
    },
  ];

  return (
    <section className="overflow-x-scroll">
      <div className="flex gap-6 ml-5 mr-5 overflow-x-scroll">
        <div className="border-[1px] p-5 border-zinc-800 cursor-pointer">
          <div className="w-[55vw] border-[0.9px] h-[20vh] border-slate-900">
            <div className="flex justify-center mt-5">
              <IoAdd size={70} />
            </div>
          </div>
          <div className="space-y-3 text-center">
            <h1 className="font-bold text-[15.4px]">Add Work</h1>
            <p className="text-[11.5px] leading-5 font-semibold">
              You can add your work for collaboration. Share your projects,
              invite collaborators, and amplify your creative impact
            </p>
          </div>
        </div>
        {works.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <div className="border-[1px] p-5 border-zinc-800 ">
                <div className="blur-sm  w-[55vw] h-[20vh] border-[1px] border-slate-900">
                  <div className="flex justify-center mt-5">
                    <CiLock size={70} />
                  </div>
                </div>
                <div className="space-y-3 ">
                  <p className="text-[11px] leading-5">{item.Para}</p>
                  {jwt !== id ? (
                    <div className="flex justify-center">
                      <button className="py-2 text-[12.5px] mt-3 font-semibold text-white rounded-full bg-[#1d9bf0] px-4 w-[50vw] mx-auto">
                        Collab
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
