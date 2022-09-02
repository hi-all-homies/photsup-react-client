import Container from "@mui/material/Container";
import { useEffect, useState, useReducer, useContext } from "react";
import PostList from "../components/post/post-list";
import Actions from "../components/actions";
import { PostService } from "../api/post-service";
import PostDialog from "../components/dialogs/post-dialog";
import { UserContext } from "./App";
import { postDialogReducer, postDialogState } from "../reducers/post-dialog-reducer";


const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const Wall = () => {
    const user = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [postDialog, dispatchPostDialog] = useReducer(postDialogReducer, postDialogState);

    const [page, setPage] = useState(0);

    useEffect(() => {
        const handleScrollEvent = () => {
            const top = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            const result = height - (top + clientHeight);
            if (result === 0)
                setPage(page+1);
        };
        window.addEventListener('scroll', handleScrollEvent);

        PostService.findPosts(`${baseUrl}/posts?page=${page}`)
            .then(newPosts => {
                if (newPosts.length === 0)
                    window.removeEventListener('scroll', handleScrollEvent);
                setPosts(p => p.concat(newPosts));
            });

        return () => window.removeEventListener('scroll', handleScrollEvent);
    },[page])


    const openPostDialog = (type, postToWatch) => {
        dispatchPostDialog({type: type, payload: postToWatch});
    }

    
    const savePost = (content, image) => {
        PostService.savePost(`${baseUrl}/posts`, content, image)
            .then(post =>{
                post = {
                    ...post,
                    author: user,
                    meLiked: false,
                    likeCount: 0

                }
                let array = [post];
                setPosts(array.concat(posts));
            });
    }

    const updatePost = (postId,content, image, imgUrl) => {
        PostService.updatePost(`${baseUrl}/posts/${postId}`, content, image)
            .then(resp => {
                let newPosts = posts.map(p => {
                    if (p.postId === postId){
                        p.content = content;
                        if (imgUrl) p.imageUrl = imgUrl;
                    }
                    return p;
                });
                setPosts(newPosts);
            });
    }

    const deletePost = (postId) => {
        PostService.deletePost(`${baseUrl}/posts/${postId}`)
            .then(resp => {
                let newPosts = posts.filter(p => p.postId !== postId);
                setPosts(newPosts);
            })
    }

    return (
        <Container>
            <Actions openPostDialog={openPostDialog}/>

            <PostList posts={posts} openPostDialog={openPostDialog}
                deletePost={deletePost}/>

            <PostDialog savePost={savePost} updPost={postDialog.postToWatch} updatePost={updatePost}
                open={postDialog.isOpened} close={() => dispatchPostDialog({type: 'close'})}/>

        </Container>
    );
}

export default Wall;