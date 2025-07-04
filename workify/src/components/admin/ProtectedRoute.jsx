import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((store) => store.job);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'recruiter') {
            navigate("/");
        }
    }, []);

    return <>{children}</>;
};

export default ProtectedRoute;
