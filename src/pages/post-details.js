import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import { useEffect, useRef, useState } from 'react';
import Comments from '../components/comments/comments';
import { useSearchParams } from 'react-router-dom';
import { PostService } from '../api/post-service';
import Post from '../components/post/post';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const PostDetails = () => {
    const [post, setPost] = useState()

    let [searchParams] = useSearchParams();
    const id = searchParams.get("postId");
    const url = `${baseUrl}/posts/${id}`;

    const gridRef = useRef(null);
    
    useEffect(() => {
        PostService.findById(url)
            .then(post => setPost(post));
    },[url]);


    return (
        <Box sx={{margin: '1.5rem 1.5rem'}}>
            { post ? 
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <Post post={post}/>
                    </Card>
                </Grid>

                <Grid item xs={6} md={4} ref={gridRef}>
                    <Comments post={post} gridRef={gridRef} />
                </Grid>
            </Grid>
            : "loading"
            }
        </Box>
    );
}

export default PostDetails;