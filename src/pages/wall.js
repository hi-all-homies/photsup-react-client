import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import PostList from "../components/post-list";
import Actions from "../components/actions";

const Wall = () => {
    const [posts, setPosts] = useState([]);
    const deletePost = (index) => {
        let mutedPosts = posts.filter((p,i) => i !== index);
        setPosts(mutedPosts);
    }

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(resp => resp.json())
            .then(posts => posts.slice(0, 7))
            .then(posts => setPosts(posts));
    },[])

    return (
        <Container>
            <Actions/>
            <PostList posts={posts} delete={deletePost}/>
        </Container>
    );
}

export default Wall;