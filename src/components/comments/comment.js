import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

const Comment = ({comment}) => {

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={comment.author.username} src={comment.author.avatarUrl} />
            </ListItemAvatar>

            <ListItemText primary={comment.author.username}
                secondary={
                    <Typography>{comment.content}</Typography>
                }/>
        </ListItem>
    );
}
export default Comment;