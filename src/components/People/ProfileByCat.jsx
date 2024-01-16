import { useEffect } from "react";
import BottomBar from "../BottomBar";
import Profiles from "../ProfileCat.jsx/Profiles";
import Discover from "../home/Discover";
import { useAnimation, motion } from "framer-motion";

export default function ProfileByCat() {
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
        <Discover />
        <Profiles />
      </motion.div>
      <BottomBar />
    </>
  );
}
