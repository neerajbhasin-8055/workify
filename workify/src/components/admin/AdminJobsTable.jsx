import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Edit from "../../assets/edit.svg";
import Button from "../ui/button";

const AdminJobsTable = () => {

    const{allAdminJobs, searchJobByText} = useSelector(store=>store.job)
    const navigate = useNavigate();
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText?.trim()) return true;

            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
    
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);
    
    return (
        <div className="container mx-auto p-5 my-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-500 text-center">All Your recent job postings</h2>

            <div className=" overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-6 text-left">Company Name</th>
                            <th className="py-3 px-6 text-left">Role</th>
                            <th className="py-3 px-6 text-left">Date</th>
                            <th className="py-3 px-6 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterJobs.length > 0 ? (
                            filterJobs.map((job) => (
                                <tr key={job._id} className="border-b">
                                    
                                    <td className="py-3 px-6">{job?.company?.name}</td>
                                    <td className="py-3 px-6">{job?.title}</td>
                                    
                                    <td className="py-3 px-6">{job.createdAt?.split('T')[0]}</td>
                                    <td className="py-3 px-6 text-right">
                                        <div className="relative flex gap-2  justify-end">
                                            <div  onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-1 cursor-pointer ">
                                            <span>Applicants</span> 
                                        </div>
                                        </div>
                                        
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No Jobs found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminJobsTable;
