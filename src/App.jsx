import "./main.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { RegistrationForm } from "./components";
export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegistrationForm />} />
    </Routes>
  );
}
