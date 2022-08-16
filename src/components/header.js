import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


const Header = (props) => {

    return (
        <AppBar position="static">
            <Toolbar>
                
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <Typography component="div" variant="h6" flexGrow={1}>
                    Phots ups
                </Typography>

                <Box>
                    { props.user && <Button color="inherit" onClick={props.logOut}>log out</Button> }
                </Box>

            </Toolbar>
        </AppBar>
    );
}

export default Header;