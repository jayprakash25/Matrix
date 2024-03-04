import React from "react";
import { BottomBar } from "../components";

export default function Help() {
  return (
    <>
      <div className="space-y-4 text-center mt-44">
        <h1 className="text-xl font-bold ">Contact Us</h1>
        <div className="text-sm text-slate-400">
          Please Mail us on{" "}
          <a className="font-semibold" href="mailto:chrahulofficial@gmail.com">
            chrahulofficial@gmail.com
          </a>
          <p>we will connect with you as soon as possible</p>
        </div>
      </div>
      <BottomBar />
    </>
  );
}
