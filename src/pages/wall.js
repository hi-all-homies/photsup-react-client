import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import PostList from "../components/post-list";
import Actions from "../components/actions";
import { PostService } from "../api/post-service";
import PostDialog from "../components/post-dialog";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const Wall = ({user}) => {
    const [open, setOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    
    
    const savePost = (content, image) => {
        PostService.savePost(`${process.env.REACT_APP_BASE_URL}/posts`, content, image)
            .then(v => console.log(v));
    }

    useEffect(() => {
        PostService.findPosts(`${baseUrl}/posts?page=0`)
            .then(posts => setPosts(posts));
    },[])

    return (
        <Container>
            <Actions user={user} open={() => setOpen(true)} />
            <PostList posts={posts}/>
            <PostDialog savePost={savePost} open={open} close={() => setOpen(false)}/>
        </Container>
    );
}

export default Wall;