import { Outlet, Navigate } from "react-router-dom";


const AuthenticatedRoute = ({user, redirectPath}) => {
    if (!user)
        return ( <Navigate to={redirectPath} replace /> );
    else
        return (<Outlet/>);
}

export default AuthenticatedRoute;