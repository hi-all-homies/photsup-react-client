
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";


const UserMenu = ({user, openUserDialog}) => {
    
    return (
        <Box display="flex" alignItems="center">
        <Typography variant="h5">
            {user.username}
        </Typography>

        <IconButton onClick={()=>openUserDialog(user.uniqueKey)}>
            <Avatar alt="ava" src={user.avatarUrl} sx={{bgcolor: deepPurple[500], width: 90, height:90}}>
                {user.username.charAt(0)}
            </Avatar>
        </IconButton>
        </Box>
    );
}

export default UserMenu;