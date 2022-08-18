import { Avatar, Dialog, DialogContent, DialogContentText, DialogTitle, Skeleton } from "@mui/material";

const UserDialog = ({open, close, shownUser}) => {
    return(
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth="sm" >
            <DialogTitle>
                {shownUser? shownUser.username: <Skeleton variant="text" fontSize="16px" />}
            </DialogTitle>

            <DialogContent sx={{display: 'flex'}}>
                {shownUser?
                <Avatar sx={{width: 150, height: 150}} src={shownUser.avatarUrl} alt="ava">
                    {shownUser.username.charAt(0)}
                </Avatar>
                :
                <Skeleton variant="circular" width={150} height={150}/>
                }
                <DialogContentText sx={{margin: '1rem auto'}}>
                    
                    {shownUser? shownUser.uniqueKey:'stub'}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default UserDialog;