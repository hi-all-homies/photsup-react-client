import Container from "@mui/material/Container";
import { useEffect, useState, useReducer, useContext } from "react";
import PostList from "../components/post-list";
import Actions from "../components/actions";
import { PostService } from "../api/post-service";
import PostDialog from "../components/post-dialog";
import UserDialog from "../components/user-dialog";
import UserService from "../api/user-service";
import { UserContext } from "./App";


const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const postDialogState = { postToWatch: null, isOpened: false };
const postDialogReducer = (dialogState, action) => {
    switch(action.type){
        case 'new':
            return { postToWatch: null, isOpened: true };
        case 'update':
            return { postToWatch: action.payload, isOpened: true };
        case 'close':
            return postDialogState;
        default:
            return dialogState;
    }
}

const userDialogInitState = { userToWatch: null, isOpened: false };
const userDialogReducer = (dialogState, action) => {
    switch(action.type){
        case 'open':
            return {
                userToWatch: action.payload,
                isOpened: true
            };
        case 'close':
            return userDialogInitState;
        default:
            return dialogState;
    }
}

const Wall = () => {
    const user = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [dialogState, dispatch] = useReducer(userDialogReducer, userDialogInitState);
    const [postDialog, dispatchPostDialog] = useReducer(postDialogReducer, postDialogState);

    useEffect(() => {
        PostService.findPosts(`${baseUrl}/posts?page=0`)
            .then(posts => setPosts(posts));
    },[])


    const openUserDialog = (uniqueKey) => {
        UserService.getUser(`${baseUrl}/users/${uniqueKey}`)
            .then(u => dispatch({type: 'open', payload: u}));
    };

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
            <Actions openPostDialog={openPostDialog}
                openUserDialog={openUserDialog} />

            <PostList posts={posts} openPostDialog={openPostDialog}
                deletePost={deletePost} openUserDialog={openUserDialog} />

            <PostDialog savePost={savePost} updPost={postDialog.postToWatch} updatePost={updatePost}
                open={postDialog.isOpened} close={() => dispatchPostDialog({type: 'close'})}/>
            
            <UserDialog shownUser={dialogState.userToWatch} open={dialogState.isOpened}
                close={() => dispatch({type: 'close'})}/>
        </Container>
    );
}

export default Wall;