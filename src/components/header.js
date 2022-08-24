import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Snackbar from '@mui/material/Snackbar';
import { useContext, useState } from 'react';
import { ColorModeContext } from '../pages/ThemedApp';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import Tooltip from "@mui/material/Tooltip";
import { UserContext } from '../pages/App';
import Avatar from '@mui/material/Avatar';

const Header = ({logOut}) => {
    const [open, setOpen] = useState(false);
    const colorMode = useContext(ColorModeContext);
    const user = useContext(UserContext);

    const handleLogOut = () => {
        logOut();
        setOpen(false);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                
                <IconButton>
                    <Avatar src={`${process.env.PUBLIC_URL}/app-logo.png`} sx={{width: 50, height: 50}} />
                </IconButton>
                <Typography component="div" variant="h6" flexGrow={1}>
                    Phots up
                </Typography>

                <Box>
                    { user && <Button color="inherit" onClick={() => setOpen(true)}>log out</Button> }
                    <Tooltip title="change color mode">
                    <IconButton color='inherit' onClick={colorMode.toggleColorMode} >
                        <InvertColorsIcon/>
                    </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>

            <Snackbar open={open} onClose={()=> setOpen(false)}
                message="Are you sure?" anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                action={
                    <>
                        <Button onClick={() => setOpen(false)} color="inherit" >No</Button>
                        <Button onClick={handleLogOut} color="error" >Yes</Button>
                    </>
                }
            />

        </AppBar>
    );
}

export default Header;