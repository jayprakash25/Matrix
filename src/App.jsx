import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import "./main.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="sign-up" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
