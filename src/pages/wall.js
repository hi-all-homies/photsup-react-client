import { Container } from "@mui/material";
import { useEffect, useState, useReducer } from "react";
import PostList from "../components/post-list";
import Actions from "../components/actions";
import { PostService } from "../api/post-service";
import PostDialog from "../components/post-dialog";
import UserDialog from "../components/user-dialog";
import UserService from "../api/user-service";


const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

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

const Wall = ({user}) => {
    const [open, setOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [updPost, setUpdPost] = useState(null);

    const [dialogState, dispatch] = useReducer(userDialogReducer, userDialogInitState);

    const openUserDialog = (uniqueKey) => {
        UserService.getUser(`${baseUrl}/users/${uniqueKey}`)
            .then(u => dispatch({type: 'open', payload: u}));
    };
    
    const savePost = (content, image) => {
        PostService.savePost(`${baseUrl}/posts`, content, image)
            .then(post =>{
                post = {...post, author: user}
                let array = [post];
                setPosts(array.concat(posts));
            });
    }

    const openUpdate = (post) => {
        setUpdPost(Object.assign({}, post));
        setOpen(true);
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


    useEffect(() => {
        PostService.findPosts(`${baseUrl}/posts?page=0`)
            .then(posts => setPosts(posts));
    },[])

    return (
        <Container>
            <Actions user={user} open={() => {setUpdPost(null); setOpen(true)}}
                openUserDialog={openUserDialog} />
            <PostList posts={posts} user={user} open={openUpdate} deletePost={deletePost} />
            <PostDialog savePost={savePost} updPost={updPost} updatePost={updatePost}
                open={open} close={() => setOpen(false)}/>
            
            <UserDialog shownUser={dialogState.userToWatch} open={dialogState.isOpened} close={() => dispatch({type: 'close'})}/>
        </Container>
    );
}

export default Wall;