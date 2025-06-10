import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Label from "../ui/label";
import Input from "../ui/input";
import Radio from "../ui/radio";
import Button from "../ui/button";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { toast } from "react-toastify"; 
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { ClipLoader } from "react-spinners"; 
const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: null,
    });

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {loading,user} = useSelector(store=>store.auth)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const changeRadioHandler = (e) => {
        setInput({ ...input, role: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        dispatch(setLoading(true))
        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            console.log(res.data.success)
            if (res.data.success) {
                toast.success(res.data.message); // ✅ Show success message
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong"); // ✅ Show error message
        }finally{
            dispatch(setLoading(false))
        }
    };
    useEffect(()=>{
        if(user){
            navigate("/")
        }
    },[])

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md w-[35%]">
                    <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                    <form onSubmit={submitHandler} className="space-y-4">
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
                                value={input.role}
                                onChange={changeRadioHandler}
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
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? <ClipLoader color="#ffffff" size={20} /> : "Signup"}
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
