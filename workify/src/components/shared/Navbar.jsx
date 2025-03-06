import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import Link
import Popover from "../ui/popover";
import Button from "../ui/button";
import UserIcon from "../../assets/user.svg?react";
import LogoutIcon from "../../assets/logout.svg?react";
import Logo from "../../assets/logo.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from 'axios'
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";
// import store from '../../redux/store'
const Navbar = () => {
    const {user} = useSelector(store=>store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
    
            if (res.data.success) {
                dispatch(setUser(null)); 
    
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 2000, 
                    theme: "dark",
                });
    
                setTimeout(() => {
                    navigate("/");
                }, 1000); 
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };
    
    return (
        <>
            <div className="bg-gray-900 p-6 border-b-4 border-gray-500">
                <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                    {/* Logo Section */}
                    <div className="flex gap-5 items-center">
                        <img src={Logo} alt="Workify Logo" className="w-10 h-10" />
                        <div className="text-white text-2xl font-bold">Workify</div>
                    </div>

                    {/* Navigation Menu */}
                    <div className="flex gap-5">
                        <ul className="text-white flex items-center gap-5">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/jobs">Jobs</Link></li>
                            <li><Link to="/browse">Browse</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                        </ul>

                        {/* Profile Popover */}
                        {!user ? (
                            <div className="flex gap-2">
                                <Link to="/login">
                                    <Button variant="outline" className="text-black bg-white w-20 hover:bg-black hover:text-white">
                                        Login
                                    </Button>
                                </Link>

                                <Link to="/signup">
                                    <Button variant="outline" className="text-white bg-gray-900 w-20 hover:bg-white hover:text-black">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover className="bg-black" buttonText="Profile">
                                <div className="p-4 w-48">
                                    <div className="flex gap-2 items-center">
                                    <img src={user?.profile?.profilePhoto} className="w-15 h-10 rounded-full"></img>
                                    <h4 className="font-md mb-2 text-lg">{user?.fullname}</h4>
                                    </div>
                                    

                                    <div className="flex flex-col items-start text-left gap-x-2">
                                        <div className="flex items-center gap-1">
                                            <img src={UserIcon} alt="User Icon" className="w-5 h-5" />
                                           <Link to="/profile">
                                           <Button variant="link" className="!text-black hover:text-gray-700">
                                                View Profile
                                            </Button></Link> 
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <img src={LogoutIcon} alt="Logout Icon" className="w-5 h-5" />
                                            <Button onClick={handleLogout} variant="link" className="!text-black hover:text-gray-700">
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Popover>
                        )}
                    </div>
                </div>
            </div>

         
        </>


    );
};

export default Navbar;
