import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { deepPurple } from "@mui/material/colors";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useState } from "react";
import StatusDialog from "./dialogs/status-dialog";
import UserService from "../api/user-service";
import CustomSnack from "./custom-snack";
import { UserContext } from "../pages/App";
import { FunctionsContext } from "../pages/Home";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const UserMenu = () => {
    const user = useContext(UserContext);
    const functions = useContext(FunctionsContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openStatus, setOpenStatus] = useState(false);
    const [snackbar, setSnackbar] = useState(false);

    const menu = Boolean(anchorEl);
    const openMenu = (event) => setAnchorEl(event.currentTarget);

    const openProfile = () => {
        functions.openUserDialog(user.uniqueKey);
        setAnchorEl(null);
    }

    const openStatusDialog = () => {
        setOpenStatus(true);
        setAnchorEl(null);
    }

    const updateStatus = (status) => {
        let newStatus = { status: status };
        return UserService.updateStatus(`${baseUrl}/users`, newStatus)
            .then(resp => {
                if (resp.ok)
                    setSnackbar(true);
                return resp;
            });
    }

    return (
        <Box display="flex" alignItems="center">
        <Typography variant="h5">
            {user.username}
        </Typography>

        <IconButton onClick={openMenu}>
            <Avatar alt="ava" src={user.avatarUrl} sx={{bgcolor: deepPurple[500], width: 90, height:90}}>
                {user.username.charAt(0)}
            </Avatar>
        </IconButton>

        <Menu open={menu} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={openStatusDialog}>
                <EditIcon/> change status
            </MenuItem>

            <MenuItem onClick={openProfile}>
                <AccountCircleIcon/> to profile
            </MenuItem>
        </Menu>

        <CustomSnack open={snackbar} closeSnack={() => setSnackbar(false)}
            message="status was updated" severity="success" />

        <StatusDialog open={openStatus} update={updateStatus} close={() => setOpenStatus(false)} />
        </Box>
    );
}

export default UserMenu;