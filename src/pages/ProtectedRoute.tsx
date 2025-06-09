import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute() {
    const { authToken } = useContext(AuthContext)!;

    if (!authToken) {
        return <Navigate to={'/'} />
    }

    return <Outlet />;
}