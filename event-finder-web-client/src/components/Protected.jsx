import {Link, Navigate, Outlet} from "react-router-dom";
import React from "react";
import {useAuth} from "../hooks/useAuth.jsx";
import styles from "../style.js";
import Navbar from "./Navbar.jsx";


export const Protected = () => {
    const { user,logout } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    )
};