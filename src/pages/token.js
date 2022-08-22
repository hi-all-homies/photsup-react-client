import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthService } from "../api/auth-service";

const Token = (props) => {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const processToken = () => {
        const token = params.get("jwt");
        if (token && AuthService.storeUser(token)){
            props.logIn();
            navigate("/");
        }
        else 
            navigate("/login");
    }

    useEffect(() =>{
        setTimeout(processToken, 1000);
    });

    return (
        <Box sx={{textAlign: "center", mt: "5%"}}>
            <CircularProgress size={100}/>
        </Box>
    );
}

export default Token;