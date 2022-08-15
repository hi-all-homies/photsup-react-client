import { Container } from "@mui/material";
import Post from "./post";


const PostList = (props) => {
    return (
        <Container>
            {props.posts.map((p,i) =>
                <Post key={p.id} post={p} delete={()=>props.delete(i)}/>
            )}
        </Container>
    );
}

export default PostList;