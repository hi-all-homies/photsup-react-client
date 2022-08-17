import {Card, CardContent, CardActions, Button, Typography, CardHeader, CardMedia, Avatar, IconButton, CardActionArea} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';

const Post = ({post}) => {

    return (
        <Card variant="outlined" sx={{margin: "1rem auto", maxWidth: "55%"}}>

           <CardHeader avatar={
            <Avatar alt="ava" src={post.author.avatarUrl} sx={{ bgcolor: red[500] }}>
                {post.author.username.charAt(0)}
            </Avatar>}
            action={
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            }

            title={post.author.username}
            subheader={post.created}
           />

           <CardMedia component="img" image={post.imageUrl}
           />

        <CardActionArea>
           <CardContent>
            <Typography variant="subtitle1">
                {post.content}
            </Typography>
           </CardContent>
        </CardActionArea>

            <CardActions>
                <Button >Like</Button>
            </CardActions>
        
        </Card>
    );
}

export default Post;