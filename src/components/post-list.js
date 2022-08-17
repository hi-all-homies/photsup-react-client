import { Container } from "@mui/material";
import Post from "./post";


const PostList = ({posts}) => {
    return (
        <Container>
            {posts.map((post) =>
                <Post key={post.postId} post={post}/>
            )}
        </Container>
    );
}

export default PostList;