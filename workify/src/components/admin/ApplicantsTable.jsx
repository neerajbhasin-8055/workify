import React from "react";
import { useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "react-toastify";

const shortListingStatus = ["Accepted", "Rejected"]
const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)
    console.log("applicants:", applicants)
    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
           console.log(res.data)
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="container mx-auto p-5 my-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-500 text-center">Applicants List</h2>

            <div className=" overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-6 text-left">Full Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Contact</th>
                            <th className="py-3 px-6 text-left">Resume</th>
                            <th className="py-3 px-6 text-left">Date</th>
                            <th className="py-3 px-6 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants?.applications?.length > 0 ? (
                            applicants.applications.map((item) => (
                                <tr key={item._id} className="border-b">
                                    <td className="py-3 px-6">{item?.applicant?.fullname}</td>
                                    <td className="py-3 px-6">{item?.applicant?.email}</td>
                                    <td className="py-3 px-6">{item?.applicant?.phoneNumber}</td>
                                    <td className="py-3 px-6">
                                        {item.applicant?.profile?.resume ? (
                                            <a
                                                className="text-blue-600 underline"
                                                href={item?.applicant?.profile?.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {item?.applicant?.profile?.resumeOriginalName}
                                            </a>
                                        ) : (
                                            <span>NA</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-6">
                                        {item?.applicant?.createdAt?.split("T")[0]}
                                    </td>
                                    <td className="py-3 px-6 text-right">
                                        <div className="flex gap-2 justify-end">
                                            {shortListingStatus.map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => statusHandler(status, item?._id)}
                                                    className={`text-sm px-3 py-1 rounded ${status === "Accepted"
                                                            ? "bg-green-600 text-white hover:bg-green-700"
                                                            : "bg-red-600 text-white hover:bg-red-700"
                                                        }`}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No applicants found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ApplicantsTable;
