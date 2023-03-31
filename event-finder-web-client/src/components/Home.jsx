import {Link, Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.jsx";

export const Home = () => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/organizer/my_events" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    )
};