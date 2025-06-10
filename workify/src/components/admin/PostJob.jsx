import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../shared/Navbar";
import Button from "../ui/button";
import Label from "../ui/label";
import Input from "../ui/input";
import SelectMenu from "../ui/selectmenu";
import { JOB_API_END_POINT } from "../../utils/constant";

const companyArray = []

const PostJob = () => {


    const [input, setInput] = useState({
        title: "",
        description: "",
        requirments: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const navigate = useNavigate();

    const { allCompanies } = useSelector(store => store.company)
    console.log("companies: ", allCompanies)
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (e) => {
        const selectedId = e.target.value;
        setInput({ ...input, companyId: selectedId });
    };


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `${JOB_API_END_POINT}/postjob`,
                input,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to post job.");
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto my-10 bg-white shadow-lg rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                    <Button
                        onClick={() => navigate(`/admin/jobs`)}
                        variant="outline"
                        className="text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200"
                    >
                        Back
                    </Button>
                    <h1 className="text-2xl font-semibold text-gray-800">Post your job here</h1>
                </div>

                {/* Form Section */}
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <Label className="block text-gray-700 font-medium">Job Title</Label>
                        <Input
                            type="text"
                            name="title"
                            value={input.title}
                            onChange={changeEventHandler}
                            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <Label className="block text-gray-700 font-medium">Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeEventHandler}
                            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <Label className="block text-gray-700 font-medium">Requirements</Label>
                        <Input
                            type="text"
                            name="requirements"
                            value={input.requirements}
                            onChange={changeEventHandler}
                            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <Label className="block text-gray-700 font-medium">Salary</Label>
                        <Input
                            type="number"
                            name="salary"
                            value={input.salary}
                            onChange={changeEventHandler}
                            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <Label className="block text-gray-700 font-medium">Location</Label>
                        <Input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={changeEventHandler}
                            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <Label className="block text-gray-700 font-medium">Job Type</Label>
                        <Input
                            type="text"
                            name="jobType"
                            value={input.jobType}
                            onChange={changeEventHandler}
                            placeholder="e.g., Full-time"
                            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <Label className="block text-gray-700 font-medium">Experience (in years)</Label>
                        <Input
                            type="number"
                            name="experience"
                            value={input.experience}
                            onChange={changeEventHandler}
                            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <Label className="block text-gray-700 font-medium">Number of Positions</Label>
                        <Input
                            type="number"
                            name="position"
                            value={input.position}
                            onChange={changeEventHandler}
                            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {
                        allCompanies.length > 0 && (
                            <div>
                                <Label className="block text-gray-700 font-medium">Select Company</Label>
                                <select
                                    name="companyId"
                                    value={input.companyId}
                                    onChange={(e) => setInput({ ...input, companyId: e.target.value })}
                                    className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black"
                                    required
                                >
                                    <option value="">-- Select a company --</option>
                                    {allCompanies.map((company) => (
                                        <option key={company._id} value={company._id}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        )
                    }

                    <div className="flex justify-end">
                        <Button type="submit" className="!bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
                            Post New Job
                        </Button>
                    </div>
                    {
                        allCompanies.length === 0 && <p className="text-sm
                        ">Please register a company first before posting jobs</p>
                    }
                </form>
            </div>
        </div>
    );
};

export default PostJob;
