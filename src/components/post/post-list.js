import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Post from "./post";
import PostHeader from "./post-header";
import PostActions from "./post-actions";


const PostList = ({posts, openPostDialog, deletePost}) => {
    return (
        <Container>
            {posts.map((post) =>
                <Card key={post.postId} variant="outlined" sx={{margin: "1rem auto", maxWidth: "55%"}}>
                    
                    <PostHeader post={post} openPostDialog={openPostDialog}
                        deletePost={deletePost}/>
                    
                    <Post post={post} />
                    <PostActions post={post} />
                </Card>
            )}
        </Container>
    );
}

export default PostList;