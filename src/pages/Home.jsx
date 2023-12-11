import React from "react";
import { BottomBar, Navbar, UserProfiles } from "../components";

export default function Home() {
  return (
    <>
      <Navbar />
      <UserProfiles />
      <BottomBar/>
    </>
  );
}
