import "./main.css";
import "animate.css";
import { useState, useEffect } from "react";
import {
  Home,
  Notifications,
  People,
  Post,
  Privacy,
  SelectHobbies,
  Signup,
  UserProfile,
  ViewUserProfile,
} from "./pages/index";
import { Routes, Route } from "react-router-dom";
import { RegistrationForm, SideBar } from "./components";
import Login from "./pages/Login";
import ProfileByCat from "./components/People/ProfileByCat";
import Chat from "./pages/Chat";

export default function App() {
  const [isphone, setisphone] = useState(false);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    const checkIsPhone = () => {
      setisphone(window.innerWidth < 1000);
    };
    checkIsPhone();
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkIsPhone, 200);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", checkIsPhone);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", checkIsPhone);
    };
  }, []);

  return (
    <>
      {isphone ? (
        <>
          <Routes>
            {jwt ? (
              <Route path="/" element={<Home />} />
            ) : (
              <Route path="/" element={<Signup />} />
            )}
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/:category" element={<ProfileByCat />} />
            <Route path="/people" element={<People />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/:userid" element={<ViewUserProfile />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hobbies" element={<SelectHobbies />} />
            <Route path="/sidebar" element={<SideBar />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        </>
      ) : (
        <p>Not Phone</p>
      )}
    </>
  );
}
