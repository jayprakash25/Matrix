import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
export default function PageTransistion({ pages }) {
  const controls = useAnimation();

  const pageVariants = {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  };

  const pageTransition = { duration: 0.5 };
  useEffect(() => {
    const startAnimation = async () => {
      await controls.start("animate");
    };
    startAnimation();
  }, [controls]);
  return (
    <motion.div
      initial="initial"
      animate={controls}
      exit="exit"
      key={Math.random()}
      variants={pageVariants}
      transition={pageTransition}
    >
      {pages}
    </motion.div>
  );
}
