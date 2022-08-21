import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List  from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';



const UserDialog = ({open, close, shownUser}) => {
    return(
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth="sm" >
            <DialogTitle>
                {shownUser? shownUser.username: ''}
            </DialogTitle>

            <DialogContent sx={{display: 'flex'}}>
                {shownUser?
                <Avatar sx={{width: 150, height: 150}} src={shownUser.avatarUrl} alt="ava">
                    {shownUser.username.charAt(0)}
                </Avatar>
                : ''
                }
                {shownUser ? 
                <List sx={{margin: "auto"}}>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <InsertEmoticonIcon/>
                        </ListItemIcon>
                        <ListItemText primary={shownUser.status} />
                    </ListItem>
                    <Divider/>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <MailOutlineIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`posts sent: ${shownUser.postsSent}`} />
                    </ListItem>
                    <Divider/>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <FavoriteIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`likes received: ${shownUser.likesReceived}`} />
                    </ListItem>
                </List>
                : ''}
            </DialogContent>
        </Dialog>
    );
}

export default UserDialog;