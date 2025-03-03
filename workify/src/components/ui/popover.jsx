import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const Popover = ({ buttonText, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  // Handle Click Outside to Close Popover
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          className="absolute left-1/2 top-12 -translate-x-1/2 bg-white shadow-lg rounded-md p-2 w-40 border"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default Popover;
