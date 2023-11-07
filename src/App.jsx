import React from "react";
import { Events } from "./Pages/index";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <Routes>
      <Route path="/events" element={<Events />} />
    </Routes>
  );
}
