import "./main.css";
import React from "react";
import { BookEvents, Events } from "./Pages/index";
import { Routes, Route } from "react-router-dom";
import { EventPageWelcome } from "./Components/eventspage";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EventPageWelcome />} />
      <Route path="/events" element={<Events />} />
      <Route path="/bookevents/:eventname" element={<BookEvents />} />
    </Routes>
  );
}
