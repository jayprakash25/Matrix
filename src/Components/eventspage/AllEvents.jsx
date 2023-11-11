import React from "react";
import { EventCard } from "./index";
export default function Events() {
  return (
    <main className="flex flex-col items-center justify-center gap-5 mx-auto my-8">
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
    </main>
  );
}
