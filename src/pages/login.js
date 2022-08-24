import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import {useTheme} from '@mui/material/styles';


const Login = () => {
    const theme = useTheme();
    const darkModeAva = <Avatar src={`${process.env.PUBLIC_URL}/github-light.png`} />;
    const lightModeAva = <Avatar src={`${process.env.PUBLIC_URL}/github.png`} />;

    const sx = {
        border: "solid", borderRadius: "10px", display: "flex"
    }

    const githubUrl =
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_GITHUB_AUTH_URL}`;
    
    const googleUrl =
        `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_GOOGLE_AUTH_URL}`;

    return (
        <Box mt={{sm: "8%", md: "10%", lg: "13%"}}>
            <Stack spacing={3} direction="column" alignItems="center" justifyContent="center">
                <Typography variant="h6">
                    Login with:
                </Typography>
            
                <Box sx={sx}>
                    {theme.palette.mode==='light' ? lightModeAva : darkModeAva}
                    <Button color="inherit" href={githubUrl}>GitHub</Button>
                </Box>

                <Box sx={sx}>
                    <Avatar src={`${process.env.PUBLIC_URL}/google-logo.svg`} />
                    <Button color="inherit" href={googleUrl}>Google</Button>
                </Box>
            </Stack>
        </Box>
    );
}

export default Login;