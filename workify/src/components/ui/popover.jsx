import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const Popover = ({ buttonText, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  // Disable scrolling when popover is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX = "hidden"; // Prevents horizontal scrolling
    } else {
      document.body.style.overflowX = "auto";
    }

    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflowX = "auto"; // Restore scrolling when popover closes
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Popover Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
      >
        {buttonText}
      </button>

      {/* Popover Content */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute center top-12 translate-x-[50%] bg-white shadow-lg rounded-md p-2 border w-max max-w-[80vw] overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default Popover;
