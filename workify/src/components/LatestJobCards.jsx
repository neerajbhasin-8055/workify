import React from "react";
import Badge from "../components/ui/badge";

const LatestJobsCards = ({
    company = "Google",
    location = "Bangalore, India",
    title = "Software Engineer",
    description = "We are looking for a talented software engineer to join our team.",
    positions = "5",
    salary = "₹20 LPA",
    type = "Full-time"
}) => {
    return (
        <div className="w-full max-w-md py-8 px-6 shadow-lg rounded-lg border border-gray-200 bg-white">
            <div className="mb-3">
                <h3 className="text-lg font-semibold">{company}</h3>
                <p className="text-gray-600 text-sm"> {location}</p>
                <p className="text-gray-800 font-bold text-md">{title} </p>
            </div>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            <div className="flex gap-2 flex-wrap">
                <Badge className="bg-gray-100 text-gray-800 border border-gray-300">{positions} Positions</Badge>
                <Badge className="bg-gray-600 text-white border border-gray-500">💰 {salary}</Badge>
                <Badge className="bg-gray-900 text-white border border-gray-700">{type}</Badge>
            </div>
        </div>
    );
};

export default LatestJobsCards;
