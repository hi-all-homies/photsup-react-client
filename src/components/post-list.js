import { Container } from "@mui/material";
import Post from "./post";


const PostList = ({posts, user, open, deletePost}) => {
    return (
        <Container>
            {posts.map((post) =>
                <Post key={post.postId} post={post} open={open} user={user}
                    deletePost={deletePost} />
            )}
        </Container>
    );
}

export default PostList;