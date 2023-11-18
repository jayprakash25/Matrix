import {Home,Signup} from "./pages/index";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { RegistrationForm } from "./components";
import "./main.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="sign-up" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </>
  );
}
