import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

const Header = (props) => {
    const [open, setOpen] = useState(false);

    const logOut = () => {
        props.logOut();
        setOpen(false);
    }

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
                    { props.user && <Button color="inherit" onClick={() => setOpen(true)}>log out</Button> }
                </Box>
            </Toolbar>

            <Snackbar open={open} onClose={()=> setOpen(false)}
                message="Are you sure?" anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                action={
                    <>
                        <Button onClick={() => setOpen(false)} color="inherit" >No</Button>
                        <Button onClick={logOut} color="error" >Yes</Button>
                    </>
                }
            />

        </AppBar>
    );
}

export default Header;