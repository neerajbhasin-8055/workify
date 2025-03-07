import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../shared/Navbar";
import Button from "../ui/button";
import Label from "../ui/label";
import Input from "../ui/input";
import { COMPANIES_API_END_POINT } from "../../utils/constant";
import { setSingleCompany } from "../../redux/companySlice";

const CompanySetup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: companyId } = useParams();
    const { singleCompany } = useSelector((store) => store.company);

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });

    // Fetch company details if companyId exists
    useEffect(() => {
        if (companyId) {
            axios.get(`${COMPANIES_API_END_POINT}/getCompany/${companyId}`, { withCredentials: true })
                .then((res) => {
                    if (res.data.success) {
                        dispatch(setSingleCompany(res.data.company));
                    }
                })
                .catch((error) => {
                    console.error("Error fetching company:", error);
                    toast.error("Failed to load company details.");
                });
        }
    }, [companyId, dispatch]);

    // Populate form fields when singleCompany is available
    useEffect(() => {
       
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null,  // File cannot be pre-filled
            });
        
    }, [singleCompany]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.put(`${COMPANIES_API_END_POINT}/update/${companyId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setSingleCompany(res.data.company));
                navigate("/admin/companies");
            }
        } catch (error) {
            console.error("Error updating company:", error);
            toast.error(error?.response?.data?.message || "Failed to update company.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto my-10 bg-white shadow-lg rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                    <Button
                        onClick={() => navigate(`/admin/companies`)}
                        variant="outline"
                        className="text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200"
                    >
                        Back
                    </Button>
                    <h1 className="text-2xl font-semibold text-gray-800">Company Setup</h1>
                </div>

                {/* Form Section */}
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <Label className="block text-gray-700 font-medium">Company Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={input.name}
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
                        <Label className="block text-gray-700 font-medium">Website</Label>
                        <Input
                            type="text"
                            name="website"
                            value={input.website}
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
                        <Label className="block text-gray-700 font-medium">Upload File</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            className="cursor-pointer"
                            name="file"
                            onChange={changeFileHandler}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" className="!bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
