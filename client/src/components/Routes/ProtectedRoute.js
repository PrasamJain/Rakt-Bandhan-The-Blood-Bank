import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../redux/features/auth/authActions";
import { Navigate } from "react-router-dom";
import API from "../../services/api";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();

    //get user current
    const getUser = async () => {
        try {
            const { data } = await API.get("/auth/current-user");
            if (data?.success) {
                dispatch(getCurrentUser(data));
            }
        } catch (error) {
            localStorage.clear();
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    });

    if (localStorage.getItem("token")) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;