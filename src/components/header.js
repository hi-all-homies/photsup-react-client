import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

const Header = (props) => {

    const navigate = useNavigate();

    const toWall = () => navigate("/");
    const toLogin = () => navigate("/login");

    return (
        <AppBar position="static">
            <Toolbar>
                
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <Typography component="div" variant="h6" >
                    Phots ups
                </Typography>

                <Box sx={{flexGrow: 1, textAlign: "center"}}>
                    <Button color="inherit" onClick={toWall}>
                        wall
                    </Button>
                    <Button color="inherit" onClick={toLogin}>
                        login
                    </Button>
                </Box>

                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;