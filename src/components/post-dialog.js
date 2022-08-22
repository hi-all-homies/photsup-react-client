import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";


const PostDialog = ({open, close, savePost, updPost, updatePost}) => {
    const [content, setContent] = useState('');
    const [preview, setPreview] = useState(null);
    const imageInput = useRef(null);

    useEffect(()=>{
        if (updPost){
            setContent(updPost.content);
            setPreview(updPost.imageUrl);
        }
    },[updPost])

    const changeContent = (event) => {
        setContent(event.target.value);
    }

    const handleFileInput = () => {
        let file = imageInput.current.files[0];
        if (!file || file.type.match(/image\/*/) == null)
            return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => setPreview(reader.result);
    }

    const handleSubmit = () => {
        savePost(content, imageInput.current.files[0]);
        closeDialog();
    }

    const handleUpdate = () => {
        updatePost(updPost.postId, content, imageInput.current.files[0], preview);
       closeDialog();
    }

    const closeDialog = () => {
        setContent('');
        setPreview(null);
        close();
    }
    
    return(
        <Dialog open={open} onClose={closeDialog} fullWidth={true} maxWidth="sm">
            <DialogTitle>{updPost ? 'update post' : 'publish new post'}</DialogTitle>

            <DialogContent>

                <Box display="flex">
                <Box sx={{ maxWidth: "55%", margin: "auto"}} component="img"
                    src={preview}>
                </Box>
                </Box>

                <TextField value={content} onChange={changeContent}
                    fullWidth autoFocus label="message" type="text" variant="standard"/>
            </DialogContent>

            <DialogActions>
                <IconButton color="primary" onClick={() => imageInput.current.click()}>
                    <input onChange={handleFileInput} ref={imageInput} hidden type="file" accept="image/**" />
                    <PhotoCameraIcon/>
                </IconButton>
                {updPost ? 
                <Button onClick={handleUpdate} disabled={content.length < 3}>
                    edit
                </Button>
                :
                <Button onClick={handleSubmit} disabled={imageInput.current ? content.length < 3 || !imageInput.current.files[0] : true}>
                    post
                </Button>
                }
            </DialogActions>
        </Dialog>
    );
}

export default PostDialog;