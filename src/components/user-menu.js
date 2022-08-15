
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";


const UserMenu = (props) => {
    
    return (
        <Box display="flex" alignItems="center">
        <Typography variant="h5">
            Username
        </Typography>

        <IconButton>
            <Avatar alt="ava" sx={{bgcolor: deepPurple[500], width: 90, height:90}}>
                RR
            </Avatar>
        </IconButton>
        </Box>
    );
}

export default UserMenu;