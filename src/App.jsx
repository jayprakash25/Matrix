import "./main.css";
import React from "react";
import { Events } from "./Pages/index";
import { Routes, Route } from "react-router-dom";
import { EventPageWelcome } from "./Components/eventspage";
export default function App() {
  return (
    <Routes>
      <Route path="/events/welcome" element={<EventPageWelcome />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  );
}
