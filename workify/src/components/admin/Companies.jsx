import React from "react";
import Navbar from "../shared/Navbar";
import Button from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { useSelector } from "react-redux";

const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    const { allCompanies } = useSelector(store => store.company);
    const { user } = useSelector(store => store.auth);

    // Ensure user exists before filtering
    const userCompanies = user ? allCompanies.filter(company => company.userId === user.id) : [];

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <div className="flex items-center justify-between">
                    <Button
                        onClick={() => navigate("/admin/companies/create")}
                        variant="outline"
                        className="px-4 mt-2 !hover:bg-gray-800 !hover:text-white"
                    >
                        New Company
                    </Button>
                </div>
                {userCompanies.length > 0 ? (
                    <CompaniesTable allCompanies={userCompanies} />
                ) : (
                    <p className="text-center mt-5">No companies found</p>
                )}
            </div>
        </>
    );
};

export default Companies;
