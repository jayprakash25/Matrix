import "./main.css";
import "animate.css";
import React from "react";
import { Home, Signup } from "./pages/index";
import { Routes, Route } from "react-router-dom";
import { RegistrationForm } from "./components";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}
