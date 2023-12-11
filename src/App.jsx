import "./main.css";
import "animate.css";
import React, { useState } from "react";
import {
  Home,
  Notifications,
  People,
  SelectHobbies,
  Signup,
  UserProfile,
} from "./pages/index";
import { Routes, Route } from "react-router-dom";
import { RegistrationForm } from "./components";

export default function App() {
  const [isphone, setisphone] = useState();

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 800) {
      setisphone(true);
    } else {
      setisphone(false);
    }
  });

  return (
    <>
      {isphone ? (
        <>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/hobbies" element={<SelectHobbies />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/people" element={<People />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </>
      ) : (
        <p>Not Phone</p>
      )}
    </>
  );
}
