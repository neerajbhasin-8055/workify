import React, { useState } from "react";
import { Link } from "react-router-dom";
import Label from "../ui/label";
import Input from "../ui/input";
import Radio from "../ui/radio";
import Button from "../ui/button";
import Navbar from "../shared/Navbar";

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: null,
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        console.log(e.target.value)
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
        console.log(e.target.value)
    };

    const changeRadioHandler = (e) => {
        setInput({ ...input, role: e.target.value });
        console.log(e.target.value)
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md w-[35%]">
                    <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                type="text"
                                placeholder="Full Name"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                type="tel"
                                placeholder="Phone Number"
                                value={input.phoneNumber}
                                name="phoneNumber"
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                            />
                        </div>

                        {/* Role Selection */}
                        <div>
                            <Label>Role</Label>
                            <Radio
                                className="cursor-pointer"
                                name="role"
                                options={[
                                    { label: "Student", value: "student" },
                                    { label: "Recruiter", value: "recruiter" },
                                ]}
                                value={input.role}  // Set the selected value
                                onChange={changeRadioHandler}  // Update the state
                            />

                        </div>

                        {/* Profile Picture Upload */}
                        <div>
                            <Label htmlFor="profile">Profile</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                className="cursor-pointer"
                                name="file"
                                onChange={changeFileHandler}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 hover:text-gray-200"
                        >
                            Sign Up
                        </Button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;
