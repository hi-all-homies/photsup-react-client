import {Card, CardContent, CardActions, Button, Typography, CardHeader, CardMedia, Avatar, IconButton, CardActionArea, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Post = ({post, user, openPostDialog, deletePost}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = (event) => setAnchorEl(event.currentTarget);
    const menu = Boolean(anchorEl);

    const edit = () => {
        openPostDialog('update', post);
        setAnchorEl(null);
    }

    const removePost = () => {
        deletePost(post.postId);
        setAnchorEl(null);
    }

    return (
        <Card variant="outlined" sx={{margin: "1rem auto", maxWidth: "55%"}}>

           <CardHeader avatar={
            <Avatar alt="ava" src={post.author.avatarUrl} sx={{ bgcolor: red[500] }}>
                {post.author.username.charAt(0)}
            </Avatar>}
            action={user.id === post.author.userId &&
                <IconButton onClick={openMenu}>
                    <MoreVertIcon/>
                </IconButton>
            }

            title={post.author.username}
            subheader={post.created}
           />
            <Menu anchorEl={anchorEl} open={menu} onClose={()=>setAnchorEl(null)}>
                <MenuItem onClick={edit}>
                    <EditIcon/> edit
                </MenuItem>
                <MenuItem onClick={removePost}>
                    <DeleteForeverIcon/> delete
                </MenuItem>
            </Menu>

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