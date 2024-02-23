import React from "react";
import PostLoader from "./PostLoader";

export default function Loader() {
  return (
    <div className="pt-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
        return (
          <React.Fragment key={index}>
            <PostLoader />
            <PostLoader />
          </React.Fragment>
        );
      })}
    </div>
  );
}
