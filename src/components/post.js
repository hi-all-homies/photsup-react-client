import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CardActionArea from '@mui/material/CardActionArea';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { PostService } from "../api/post-service";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const Post = ({post, user, openPostDialog, deletePost}) => {
    const [aPost, setPost] = useState(post);
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

    const addLike = () => {
        PostService.addLike(`${baseUrl}/posts/${post.postId}/like`)
            .then(resp => resp.json())
            .then(result => {
                let newPost = Object.assign({}, aPost);
                if (result){
                    newPost.meLiked = true;
                    newPost.likeCount += 1;
                    setPost(newPost);
                }
                else {
                    newPost.meLiked = false;
                    newPost.likeCount -= 1;
                    setPost(newPost);
                }
            });
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
                <IconButton onClick={addLike} color="error">
                    {aPost.meLiked ?
                        <FavoriteIcon/> :
                        <FavoriteBorderIcon/>
                    }
                </IconButton>
                <Typography>{aPost.likeCount}</Typography>
            </CardActions>
        
        </Card>
    );
}

export default Post;