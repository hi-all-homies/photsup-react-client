import List from '@mui/material/List';
import Comment from './comment';
import AddComment from "./add-comment";
import CommentsHeader from "./comments-header";
import { useState, useEffect} from "react";
import Divider from '@mui/material/Divider';
import { PostService } from "../../api/post-service";
import Box from '@mui/material/Box';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const Comments = ({post, gridRef}) => {
    const [comments, setComments] = useState(post.comments);
    const [maxHeight, setHeight] = useState(0);

    const addComment = (content) => {
        let comm = { postId: post.postId, content: content };
        let url = `${baseUrl}/posts/${post.postId}/comment`;

        PostService.addComment(url, comm)
            .then(comment => setComments(comments.concat(comment)));
    }

    useEffect(() => {
        if(gridRef)
            setHeight(gridRef.current.clientHeight-150)
    },[gridRef]);

    return (
        <>
        <CommentsHeader post={post}/>
        <AddComment addComment={addComment}/>

        <List sx={{maxHeight: `${maxHeight}px`, overflow: 'auto'}}>
            {comments.map(comment =>
                <Box key={comment.commentId} >
                <Comment comment={comment}/>
                <Divider variant="inset" component="li"/>
                </Box>
            )}
        </List>
        </>
    );
}

export default Comments;