import AddIcon from "@mui/icons-material/Add";
import { Box, Toolbar } from "@mui/material";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup'
import UserMenu from "./user-menu";


const Actions = ({user, open, openUserDialog}) => {
    return (
        <Toolbar sx={{mt: "1.5rem"}}>
            <Box sx={{flexGrow: 1}}>
                <ButtonGroup>
                    <Button onClick={open} variant="contained" startIcon={<AddIcon/>}>
                        post
                    </Button>
                </ButtonGroup>
            </Box>

            <Box>
                <UserMenu user={user} openUserDialog={openUserDialog}/>
            </Box>
        </Toolbar>
    );
}

export default Actions;