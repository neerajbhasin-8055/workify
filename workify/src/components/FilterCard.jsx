import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

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
    const [selectedValue, setSelectedValue] = useState('');
const dispatch = useDispatch()
    const changeHandler = (e) => {
        setSelectedValue(e.target.value); // set the actual string value (like "Hyderabad")
    };

    useEffect(() => {
       dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue]);

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
            <h1 className="text-lg font-semibold mb-4">Filter Jobs</h1>
            {filterData.map((filter, index) => (
                <div key={index} className="mb-6">
                    <h2 className="text-md font-medium mb-3">{filter.filterType}</h2>
                    <div className="flex flex-col gap-2">
                        {filter.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <label key={itemId} htmlFor={itemId} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        id={itemId}
                                        name={filter.filterType} // unique radio group per filterType
                                        value={item}
                                        checked={selectedValue === item}
                                        onChange={changeHandler}
                                    />
                                    {item}
                                </label>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
