import React from "react";
import {
  AllEvents,
  FilterEvents,
  Navbar,
} from "../Components/eventspage/index";
export default function Events() {
  return (
    <main>
      <Navbar />
      <FilterEvents />
      <AllEvents />
    </main>
  );
}
