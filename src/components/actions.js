import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup'
import UserMenu from "./user-menu";


const Actions = ({openPostDialog}) => {
    
    const open = () => openPostDialog('new');

    return (
        <Toolbar sx={{mt: "1rem"}}>
            <Box sx={{flexGrow: 1}}>
                <ButtonGroup>
                    <Button onClick={open} variant="contained" startIcon={<AddIcon/>}>
                        post
                    </Button>
                </ButtonGroup>
            </Box>

            <Box>
                <UserMenu/>
            </Box>
        </Toolbar>
    );
}

export default Actions;