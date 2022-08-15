import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


const Token = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const processToken = () => {
        const token = params.get("jwt");
        if (token){
            localStorage.setItem("token", token);
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