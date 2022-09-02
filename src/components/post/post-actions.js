import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useContext, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {FunctionsContext} from "../../pages/Home";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const PostActions = ({post}) => {
    const [aPost, setPost] = useState(post);
    const functions = useContext(FunctionsContext);

    const handleLike = () => {
        functions.addLike(`${baseUrl}/posts/${post.postId}/like`)
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
        <CardActions>
                <IconButton onClick={handleLike} color="error">
                    {aPost.meLiked ?
                        <FavoriteIcon/> :
                        <FavoriteBorderIcon/>
                    }
                </IconButton>
                <Typography>{aPost.likeCount}</Typography>
        </CardActions>
    );
}

export default PostActions;