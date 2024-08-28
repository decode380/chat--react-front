import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

export default function ProtectRoute({ children, isPublic = false}) {
    const { auth } = useContext(AuthContext);

    if(isPublic) {
        if (auth.token !== null) return <Navigate to={'/dashboard'}/>; 
    } else {
        if (auth.token === null) return <Navigate to={'/login'}/>;  
    }

    return children;
}