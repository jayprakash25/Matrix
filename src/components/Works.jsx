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
              <div className="border-[1px] p-5 border-zinc-800 max-w-[90vw]">
                <div className="blur-sm  w-[50vw] h-[20vh] border-[1px] border-slate-900">
                  <div className="flex justify-center mt-5">
                    <CiLock size={70} />
                  </div>
                </div>
                <div className="space-y-3 text-center">
                  <h1 className="font-semibold text-[15px]">{item.Tittle}</h1>
                  <p className="text-[11px] leading-5">{item.Para}</p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
