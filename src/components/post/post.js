import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from "react-router-dom";


const Post = ({post}) => {
    const navigate = useNavigate();

    return (
        <>
        <CardMedia component="img" image={post.imageUrl}
            onClick={() => navigate(`/details?postId=${post.postId}`)} sx={{cursor: 'pointer'}}/>

        <CardActionArea>
           <CardContent>
            <Typography variant="subtitle1">
                {post.content}
            </Typography>
           </CardContent>
        </CardActionArea>
        </>
    );
}

export default Post;