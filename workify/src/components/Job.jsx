import React from "react";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getRandomColor = () => {
  const colors = [
    "#FEE2E2", "#FEF3C7", "#D1FAE5", "#DBEAFE", "#EDE9FE",
    "#FDE68A", "#FBCFE8", "#C7D2FE", "#A7F3D0", "#FCE7F3",
    "#FAE8E8", "#FEF9C3", "#E0F2FE", "#DCFCE7", "#FDEDEC"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const timeAgo = (daysAgo) => {
  return daysAgo === 0 ? "Today" : `${daysAgo} days ago`;
};

const Job = ({
  company = "Google",
  location = "Bangalore, India",
  title = "Software Engineer",
  description = "We are looking for a talented software engineer to join our team.",
  positions = "5",
  salary = "₹20 LPA",
  type = "Full-time",
  logo = "https://via.placeholder.com/40", // Default logo
  daysAgo = 5, // Example: Posted 5 days ago
}) => {
  const navigate = useNavigate(); // ✅ Corrected: Moved inside the component
  const bgColor = getRandomColor();
  const jobId = "afjdsadja"; // ✅ Keep jobId inside the component

  return (
    <div
      className="w-full max-w-md py-6 px-4 shadow-lg rounded-lg border border-gray-200"
      style={{ backgroundColor: bgColor }}
    >
      {/* Posting Date & Bookmark */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-600 text-sm">{timeAgo(daysAgo)}</p>
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Bookmark className="text-black" />
        </button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3">
        <img src='https://yt3.googleusercontent.com/FJI5Lzbf2dMd32xOqhoKpJArJooZhoX6v2qOcFO-wjSZUvs3H9xqq2gK4DQ47X0KnYgf7X2rpdU=s900-c-k-c0x00ffffff-no-rj' alt="Company Logo" className="w-[20%] h-[100%] rounded-md" />
        <div>
          <h3 className="text-lg font-semibold">{company}</h3>
          <p className="text-gray-600 text-sm">{location}</p>
        </div>
      </div>

      {/* Job Title */}
      <h2 className="text-2xl font-semibold mt-3">{title}</h2>
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      {/* Job Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-full text-xs">
          {positions} Positions
        </span>
        <span className="px-3 py-1 bg-gray-600 text-white border border-gray-500 rounded-full text-xs">
          💰 {salary}
        </span>
        <span className="px-3 py-1 bg-gray-900 text-white border border-gray-700 rounded-full text-xs">
          {type}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button onClick={() => navigate(`/description/${jobId}`)} className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900">
          Details
        </button>
        <button className="border border-gray-500 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200">
          Save Later
        </button>
      </div>
    </div>
  );
};

export default Job;
