import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Label from "../ui/label";
import Input from "../ui/input";
import Radio from "../ui/radio";
import Button from "../ui/button";
import Navbar from "../shared/Navbar";
import { set } from "mongoose";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: ''
    })
    const navigate = useNavigate('')
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        console.log(e.target.value)
    }
    const changeRadioHandler = (e) => {
        setInput({ ...input, role: e.target.value })
        console.log(e.target.value)
    }
    const customToastStyle = {
        background: "#000", // Black background
        color: "#fff", // White text
      };
    const submitHandler = async (e)=>{
        e.preventDefault()
       

        try {
            const res = await axios.post('http://localhost:8000/api/user/login',input,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
            if (res.data.success){
                navigate('/')
                toast.success(res.data.message,{
                    customToastStyle
                });
            }
        } catch (error) {
            console.log(error)
              toast.error(error.response?.data?.message || "Something went wrong",{
                customToastStyle
              });
        }
    }
    return (
        <>
            {/* Navbar at the top */}
            <Navbar />

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md w-[35%]">
                    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                    <form onSubmit={submitHandler} className="space-y-4">
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
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                            />
                        </div>

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

                        <Button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 hover:text-gray-200"
                        >
                            Login
                        </Button>
                    </form>

                    {/* Signup Link */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Signup here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
