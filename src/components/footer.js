import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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