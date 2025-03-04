import React, { useState } from "react";


const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Pune", "Hyderabad", "Mumbai"],
    },
    {
        filterType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "Data Analyst",
            "Full Stack Developer",
            "Data Science Engineer",
        ],
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42k-1Lakh", "1Lakh-5Lakh"],
    },
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        Location: "",
        Industry: "",
        Salary: "",
    });

    const handleRadioChange = (filterType, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
            <h1 className="text-lg  font-semibold mb-4">Filter Jobs</h1>
            {filterData.map((filter, index) => (
                <div key={index} className="mb-6">
                    <h2 className="text-md font-medium mb-3">{filter.filterType}</h2>
                    <div className="flex flex-col gap-2">
                        {filter.array.map((item) => (
                            <label key={item} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name={filter.filterType} // Ensures each category has a unique radio group
                                    value={item}
                                    checked={selectedFilters[filter.filterType] === item}
                                    onChange={() => handleRadioChange(filter.filterType, item)}
                                    className="cursor-pointer"
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
