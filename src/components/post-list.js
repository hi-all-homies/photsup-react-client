import { Container } from "@mui/material";
import Post from "./post";


const PostList = ({posts, user, openPostDialog, deletePost}) => {
    return (
        <Container>
            {posts.map((post) =>
                <Post key={post.postId} post={post} openPostDialog={openPostDialog}
                    user={user} deletePost={deletePost} />
            )}
        </Container>
    );
}

export default PostList;