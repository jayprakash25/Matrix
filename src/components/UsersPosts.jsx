import React from "react";

export default function UsersPosts({ posts }) {
  console.log(posts);
  return (
    <main className="flex flex-col items-center justify-center gap-5 mt-10">
      {posts?.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <div className="border-[1px] border-gray-200 rounded-lg shadow-sm max-w-md p-4 space-y-3.5">
              <div className="flex items-center gap-5">
                <img
                  src={item.Pic}
                  className="object-cover w-12 h-12 rounded-full"
                  alt=""
                />
                <h1 className="text-lg font-semibold text-slate-800">
                  {item.Name}
                </h1>
              </div>
              <div>
                <img className="" src={item.image} alt="" />
              </div>
              <div>
                <p className="text-sm leading-6 text-slate-800">{item.Text}</p>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </main>
  );
}
