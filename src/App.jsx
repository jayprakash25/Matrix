import "./main.css";
import "animate.css";
import { useState, useEffect } from "react";
import ProtectedRoute from "./Auth/ProtectedRoute";
import {
  Home,
  Messages,
  Notifications,
  People,
  Post,
  Privacy,
  SelectHobbies,
  Signup,
  UserProfile,
  ViewUserProfile,
  Security,
  // Connections,
  Help,
} from "./pages/index";
import { Routes, Route } from "react-router-dom";
import { Loader, RegistrationForm, SideBar } from "./components";
import Login from "./pages/Login";
import ProfileByCat from "./components/People/ProfileByCat";
import Chat from "./pages/Chat";
import { useAuth } from "./ContextProvider/AuthContext";
import { generateToken, messaging } from "./Firebase";
import { onMessage } from "firebase/messaging";
export default function App() {
  const { currentUser, loading, isNewUser } = useAuth();

  const [isphone, setisphone] = useState(false);

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

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      if (Notification.permission === "granted") {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
          icon: payload.notification.image,
        };
        new Notification(notificationTitle, notificationOptions);
      }
    });
  }, []);

  if (loading) {
    return (
      <>
        <div>
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      {isphone ? (
        <>
          <Routes>
            <Route
              path="/"
              element={
                !currentUser ? (
                  <Signup />
                ) : isNewUser ? (
                  <RegistrationForm />
                ) : (
                  <Home />
                )
              }
            />
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            {/* Protected Routes */}
            <Route
              path="/home"
              element={<ProtectedRoute element={<Home />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<UserProfile />} />}
            />{" "}
            <Route
              path="/profile/:category"
              element={<ProtectedRoute element={<ProfileByCat />} />}
            />
            <Route
              path="/people"
              element={<ProtectedRoute element={<People />} />}
            />
            <Route
              path="/notifications"
              element={<ProtectedRoute element={<Notifications />} />}
            />
            <Route
              path="/:userid"
              element={<ProtectedRoute element={<ViewUserProfile />} />}
            />
            <Route
              path="/privacy"
              element={<ProtectedRoute element={<Privacy />} />}
            />
            <Route path="/register" element={<RegistrationForm />} />
            <Route
              path="/hobbies"
              element={<ProtectedRoute element={<SelectHobbies />} />}
            />
            <Route
              path="/sidebar"
              element={<ProtectedRoute element={<SideBar />} />}
            />
            <Route
              path="/chat/:id"
              element={<ProtectedRoute element={<Chat />} />}
            />
            <Route
              path="/post"
              element={<ProtectedRoute element={<Post />} />}
            />
            <Route
              path="/messages"
              element={<ProtectedRoute element={<Messages />} />}
            />
            <Route
              path="/connections"
              element={<ProtectedRoute element={<Messages />} />}
            />
            <Route
              path="/help"
              element={<ProtectedRoute element={<Help />} />}
            />
            <Route
              path="/Security"
              element={<ProtectedRoute element={<Security />} />}
            />
          </Routes>
        </>
      ) : (
        <p>Not Phone</p>
      )}
    </>
  );
}
