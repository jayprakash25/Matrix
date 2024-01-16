import { BottomBar } from "../components";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Notification from "../components/notifications/Notification";
import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";

export default function Notifications() {
  const controls = useAnimation();

  useEffect(() => {
    const startAnimation = async () => {
      await controls.start("animate");
    };
    startAnimation();
  }, [controls]);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const pageTransition = { duration: 0.5 };

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        <nav className="p-4">
          <div className="flex items-center w-[60vw] justify-between">
            <div>
              <Link to={"/home"}>
                <FaArrowLeft size={20} color="white" />
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-lg font-semibold">Notifications</h1>
            </div>
          </div>
        </nav>
        <Notification />
      </motion.div>
      <BottomBar />
    </>
  );
}
