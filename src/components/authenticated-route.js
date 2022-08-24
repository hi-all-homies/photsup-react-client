import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../pages/App";


const AuthenticatedRoute = ({redirectPath}) => {
    const user = useContext(UserContext);
    if (!user)
        return ( <Navigate to={redirectPath} replace /> );
    else
        return (<Outlet/>);
}

export default AuthenticatedRoute;