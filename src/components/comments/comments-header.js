import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { deepPurple } from "@mui/material/colors";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContext, useState } from "react";
import {FunctionsContext} from "../../pages/Home";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const CommentsHeader = ({post}) => {
    const functions = useContext(FunctionsContext);
    const [likeState, setLikeState] =
        useState({ meLiked: post.meLiked, likeCount: post.likeCount });

    const handleLike = () => {
        functions.addLike(`${baseUrl}/posts/${post.postId}/like`)
            .then(result => {
                if(result)
                    setLikeState({meLiked: true, likeCount: ++likeState.likeCount});
                else
                    setLikeState({meLiked: false, likeCount: --likeState.likeCount});
            })
    }

    const showAuthor = () => functions.openUserDialog(post.author.uniqueKey);

    return (
        <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
                <IconButton onClick={handleLike} color="error">
                    {likeState.meLiked ?
                        <FavoriteIcon/> :
                        <FavoriteBorderIcon/>
                    }
                    <Typography>{likeState.likeCount}</Typography>
                </IconButton>
            </Box>

            <Typography variant="h6">
                {post.author.username}
            </Typography>

            <IconButton onClick={showAuthor}>
                <Avatar alt="ava" src={post.author.avatarUrl} sx={{bgcolor: deepPurple[500], width: 60, height:60}}>
                    {post.author.username.charAt(0)}
                </Avatar>
            </IconButton>
        </Box>
    );
}

export default CommentsHeader;