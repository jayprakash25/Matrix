import "./main.css";
import "animate.css";
import { useState, useEffect } from "react";
import {
  Collabraters,
  Home,
  Notifications,
  People,
  Privacy,
  SelectHobbies,
  Signup,
  UserProfile,
  ViewUserProfile,
} from "./pages/index";
import { Routes, Route } from "react-router-dom";
import { RegistrationForm } from "./components";
import Login from "./pages/Login";
import ProfileByCat from "./components/People/ProfileByCat";

export default function App() {
  const [isphone, setisphone] = useState(false);

  useEffect(() => {
    // Function to check and set isphone state
    const checkIsPhone = () => {
      setisphone(window.innerWidth < 1000);
    };

    // Initial check on component mount
    checkIsPhone();

    // Debounce resize event to improve performance
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkIsPhone, 200);
    };

    // Event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", checkIsPhone);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", checkIsPhone);
    };
  }, []);

  return (
    <>
      {/* {isphone ? ( */}
      <>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hobbies" element={<SelectHobbies />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/:category" element={<ProfileByCat />} />
          <Route path="/people/" element={<People />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/:userid" element={<ViewUserProfile />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/collabs/:id" element={<Collabraters />} />
        </Routes>
      </>
      {/* ) : ( */}
      {/* <p>Not Phone</p> */}
      {/* )} */}
    </>
  );
}
