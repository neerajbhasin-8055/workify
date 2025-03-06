import React from "react";

const ApplicationTable = () => {
    const appliedJobs = [
        {
            id: 1,
            title: "Software Engineer",
            company: "Google",
            location: "Bangalore, India",
            status: "Pending",
            appliedDate: "Feb 20, 2024",
        },
        {
            id: 2,
            title: "Frontend Developer",
            company: "Microsoft",
            location: "Hyderabad, India",
            status: "Interview Scheduled",
            appliedDate: "Feb 15, 2024",
        },
        {
            id: 3,
            title: "Backend Developer",
            company: "Amazon",
            location: "Pune, India",
            status: "Rejected",
            appliedDate: "Feb 10, 2024",
        },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            {/* Table Caption */}
            <h2 className="text-xl font-semibold mb-4">Applied Jobs</h2>

            {/* Table Container */}
            <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-lg">
                <table className="w-full border-collapse bg-white">
                    {/* Table Header */}
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Job Title</th>
                            <th className="p-3 text-left">Company</th>
                           
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Applied Date</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {appliedJobs.map((job) => (
                            <tr key={job.id} className="border-t">
                                <td className="p-3">{job.title}</td>
                                <td className="p-3">{job.company}</td>
                               
                                <td
                                    className={`p-3 font-medium ${job.status === "Pending"
                                            ? "text-yellow-600"
                                            : job.status === "Interview Scheduled"
                                                ? "text-blue-600"
                                                : "text-red-600"
                                        }`}
                                >
                                    {job.status}
                                </td>
                                <td className="p-3">{job.appliedDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationTable;
