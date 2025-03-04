import React from "react";
import clsx from "clsx";

// Define button variants
const buttonVariants = {
  default: "bg-blue-500 text-white hover:bg-blue-600",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-200",
  link: "bg-transparent text-blue-500 underline hover:text-blue-600",
  outline: "border border-gray-500 text-gray-700 hover:bg-gray-100",
  destructive: "bg-red-500 text-white hover:bg-red-600"
};

const Button = ({ variant = "default", children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "px-0 py-2 rounded-lg font-medium transition duration-200",
        buttonVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
