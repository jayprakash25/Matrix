import React from "react";
import { EventCard } from "./index";
export default function Events() {
  return (
    <div className="flex flex-col justify-center mx-auto items-center gap-5 my-8">
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
    </div>
  );
}
