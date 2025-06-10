import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import Button from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Input from "../ui/input";

import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";

const AdminJobs = () => {

    useGetAllAdminJobs()
    const navigate = useNavigate();
    const { allCompanies } = useSelector(store => store.company);
    const { user } = useSelector(store => store.auth);
    const [input,setInput] = useState("")
const dispatch = useDispatch()
    // Ensure user exists before filtering
    const userCompanies = user ? allCompanies.filter(company => company.userId === user.id) : [];
useEffect(()=>{
    dispatch(setSearchJobByText(input))
},[input])
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <div className="flex items-center justify-between">
                    <Input className="w-[20%] p-4" placeholder="Filter by name" onChange={(e)=>setInput(e.target.value)}></Input>
                    <Button
                        onClick={() => navigate("/admin/jobs/create")}
                        variant="outline"
                        className="px-2 mt-2 !hover:bg-gray-800 !hover:text-white"
                    >
                        New Job 
                    </Button>
                </div>
                {userCompanies.length > 0 ? (
                    <AdminJobsTable allCompanies={userCompanies} />
                ) : (
                    <p className="text-center mt-5">Post New Job</p>
                )}
            </div>
        </>
    );
};

export default AdminJobs;
