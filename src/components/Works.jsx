import React from "react";
import { CiLock } from "react-icons/ci";

export default function Works() {
  const works = [
    {
      Tittle: "Lorem ipsum dolor sit amet.",
      Para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nemo consequuntur quidem minima non placeat at sequi. Excepturi omnis voluptas ad, ",
    },
    {
      Tittle: "Lorem ipsum dolor sit amet.",
      Para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nemo consequuntur quidem minima non placeat at sequi. Excepturi omnis voluptas ad, ",
    },
    {
      Tittle: "Lorem ipsum dolor sit amet.",
      Para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nemo consequuntur quidem minima non placeat at sequi. Excepturi omnis voluptas ad, ",
    },
    {
      Tittle: "Lorem ipsum dolor sit amet.",
      Para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nemo consequuntur quidem minima non placeat at sequi. Excepturi omnis voluptas ad, ",
    },
    {
      Tittle: "Lorem ipsum dolor sit amet.",
      Para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nemo consequuntur quidem minima non placeat at sequi. Excepturi omnis voluptas ad, ",
    },
  ];

  return (
    <section className="overflow-x-scroll">
      <div className="flex gap-6 ml-5 mr-5 overflow-x-scroll">
        {works.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <div className="max-w-xs bg-bg-zinc-800 border-[1px] p-5 border-zinc-800">
                <div className="blur-sm  w-[50vw] h-[20vh] border-[1px] border-slate-900">
                  <div className="absolute top-6 left-20">
                    <CiLock size={70} />
                  </div>
                </div>
                <div className="space-y-3 text-center">
                  <h1 className="font-semibold">{item.Tittle}</h1>
                  <p className="text-[11px] leading-5">{item.Para}</p>
                  <button className="py-1.5  text-center mt-3 text-[11px] font-bold text-white rounded-full bg-[#1d9bf0] px-5 w-[40vw] ">
                    Collab
                  </button>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
