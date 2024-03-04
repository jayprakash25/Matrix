import React from "react";
import PropTypes from "prop-types";

export default function UsersPosts({ posts }) {
  return (
    <main className="flex flex-col items-center justify-center gap-5 mb-20 mt-7">
      {posts?.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <div className="max-w-md px-4 py-3 rounded-lg shadow-sm lg border-[1px] mx-4 p-3 border-zinc-800">
              <div>
                <img
                  className="mx-auto rounded-lg w-[85vw] object-cover"
                  src={item?.image}
                  alt=""
                />
              </div>
              <div className="flex items-center gap-3 mt-5">
                <img
                  src={item?.Pic}
                  className="object-cover w-12 h-12 rounded-full"
                  alt=""
                />
                <h1 className="text-xl font-semibold">{item?.Name}</h1>
              </div>
              <p className="mt-3 text-sm leading-6">{item?.Text}</p>
            </div>
          </React.Fragment>
        );
      })}
    </main>
  );
}

UsersPosts.propTypes = {
  posts: PropTypes.array,
};
