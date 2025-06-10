import React from "react";
import Badge from "../components/ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobsCards = ({job}) => {
    const navigate = useNavigate()
    return (
        <div onClick={()=>navigate(`description/${job._id}`)} className="cursor-pointer w-full max-w-md py-8 px-6 shadow-lg rounded-lg border border-gray-200 bg-white">
            <div className="mb-3">
                <h3 className="text-lg font-semibold">{job?.company?.name}</h3>
                <p className="text-gray-600 text-sm"> India</p>
                <p className="text-gray-800 font-bold text-md">{job?.title} </p>
            </div>
            <p className="text-gray-600 text-sm mb-4">{job?.description}</p>
            <div className="flex gap-2 flex-wrap">
                <Badge className="bg-gray-100 text-gray-800 border border-gray-300">{job?.position} Positions</Badge>
                <Badge className="bg-gray-600 text-white border border-gray-500">💰 {job?.salary}</Badge>
                <Badge className="bg-gray-900 text-white border border-gray-700">{job?.jobType}</Badge>
            </div>
        </div>
    );
};

export default LatestJobsCards;
