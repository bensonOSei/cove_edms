import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contextProviders/contexts/AuthContext";
import { useContext } from "react";


export const ProtectedRoute = () => {
    const { isLoggedIn } = useContext(AuthContext);
    // console.log('isLoggedIn:', isLoggedIn); // Check the value of isLoggedIn

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;

};
