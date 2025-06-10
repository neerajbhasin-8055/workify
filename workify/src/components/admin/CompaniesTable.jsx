import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Edit from "../../assets/edit.svg";
import Button from "../ui/button";

const CompaniesTable = () => {
    const { allCompanies, searchCompanyByText } = useSelector(store => store.company);
    const navigate = useNavigate();
    const [filterCompany, setFilterCompany] = useState(allCompanies)
    useEffect(() => {
        const filteredCompany = allCompanies.length >= 0 && allCompanies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompany)
    }, [allCompanies, searchCompanyByText])
    return (
        <div className="container mx-auto p-5 my-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-500 text-center">All Your registered companies</h2>

            <div className=" overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-6 text-left">Logo</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Date</th>
                            <th className="py-3 px-6 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterCompany.length > 0 ? (
                            filterCompany.map((company) => (
                                <tr key={company._id} className="border-b">
                                    <td className="py-3 px-6">
                                        <img
                                            src={company.logo || "https://via.placeholder.com/50"}
                                            alt="Company Logo"
                                            className="w-15 h-10 rounded-full"
                                        />
                                    </td>
                                    <td className="py-3 px-6">{company.name}</td>
                                    <td className="py-3 px-6">{company.createdAt?.split('T')[0]}</td>
                                    <td className="py-3 px-6 text-right">
                                        <div className="relative flex justify-end">
                                            <Button
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                variant="outline"
                                                className="w-10 h-10 flex items-center justify-center"
                                            >
                                                <img src={Edit} alt="Edit" className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No companies found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompaniesTable;
