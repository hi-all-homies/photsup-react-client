import Container from "@mui/material/Container";
import Post from "./post";


const PostList = ({posts, openPostDialog, deletePost, openUserDialog}) => {
    return (
        <Container>
            {posts.map((post) =>
                <Post key={post.postId} post={post} openPostDialog={openPostDialog}
                    deletePost={deletePost} openUserDialog={openUserDialog}/>
            )}
        </Container>
    );
}

export default PostList;