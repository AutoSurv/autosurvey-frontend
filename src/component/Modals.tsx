import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
type Props = {
  isvisible: boolean;
  // fix this any
  onClose: any;
  children?: React.ReactNode;
};

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "80px", opacity: 1, transition: { delay: 0.5 } },
};

export default function Modals({ isvisible, onClose, children }: Props) {
  if (!isvisible) return null;
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "wrapper") {
      onClose();
    }
    
  };
  return (
    <AnimatePresence>
      {isvisible && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          className="  fixed top-0 left-0 w-screen h-screen inset-0 bg-black/25  bg-opacity-60 backdrop-blur-sm flex justify-center items-center "
          id="wrapper"
          onClick={handleClose}
        >
          <motion.div
            variants={modal}
            className="  mx-auto shadow-sm bg-white w-[400px]  flex flex-col rounded-lg"
          >
            <button
              onClick={onClose}
              className="  text-secondary bg-primary px-[10px] py-[3px] rounded-md text-lg  place-self-end font-bold "
            >
              X
            </button>
            <div className=" bg-white shadow-sm p-2 ">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
