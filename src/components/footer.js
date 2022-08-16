import { Box, Typography } from "@mui/material";
import '../pages/App.css';

const Footer = () => {
    return (
        <Box className='footer-box' bgcolor="text.secondary">
            <Typography textAlign="center">
                phots up &reg; {new Date().getFullYear()}
            </Typography>
        </Box>
    );
}

export default Footer;