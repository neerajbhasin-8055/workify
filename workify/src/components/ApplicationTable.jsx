import { all } from "axios";
import React from "react";
import { useSelector } from "react-redux";

const ApplicationTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job)

    console.log(allAppliedJobs, "applied jobs")
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
                        {!allAppliedJobs || allAppliedJobs.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    You haven't applied for any job yet.
                                </td>
                            </tr>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <tr key={appliedJob._id} className="border-t">
                                    <td className="p-3">{appliedJob.job.title}</td>
                                    <td className="p-3">{appliedJob.job.company.name}</td>
                                    <td className="p-3">{appliedJob.status}</td>
                                    <td className="p-3">
                                        {new Date(appliedJob.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ApplicationTable;
