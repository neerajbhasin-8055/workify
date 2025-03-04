import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import Popover from "../ui/popover";
import Button from "../ui/button";
import UserIcon from "../../assets/user.svg?react";
import LogoutIcon from "../../assets/logout.svg?react";
import Logo from "../../assets/logo.svg?react";

const Navbar = () => {
    const user = false;
    
    return (
        <div className="bg-gray-900">
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
                                <h4 className="font-md mb-2 text-lg">Neeraj Bhasin</h4>

                                <div className="flex flex-col items-start text-left gap-2">
                                    <div className="flex items-center gap-x-2">
                                        <img src={UserIcon} alt="User Icon" className="w-5 h-5" />
                                        <Button variant="link" className="text-black hover:text-gray-700">
                                            View Profile
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <img src={LogoutIcon} alt="Logout Icon" className="w-5 h-5" />
                                        <Button variant="link" className="text-black hover:text-gray-700">
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
    );
};

export default Navbar;
