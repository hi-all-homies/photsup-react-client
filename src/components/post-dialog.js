import { PhotoCamera } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";


const PostDialog = ({open, close, savePost}) => {
    const [content, setContent] = useState('');
    const [preview, setPreview] = useState(null);
    const imageInput = useRef(null);

    const changeContent = (event) => {
        setContent(event.target.value);
    }

    const handleFileInput = () => {
        let file = imageInput.current.files[0];
        if (!file || file.type.match(/image\/*/) == null)
            return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(imageInput.current.files[0]);
        reader.onload = event => setPreview(reader.result);
    }

    const handleSubmit = () => {
        savePost(content, imageInput.current.files[0]);
        setContent('');
        setPreview(null);
        close();
    }

    return(
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth="sm">
            <DialogTitle>publish new post</DialogTitle>

            <DialogContent>

                <Box display="flex">
                <Box sx={{ maxWidth: "55%", margin: "auto"}}
                    component="img" src={preview}>
                </Box>
                </Box>

                <TextField id="content" value={content} onChange={changeContent}
                fullWidth autoFocus label="message" type="text" variant="standard"/>
            </DialogContent>

            <DialogActions>
                <IconButton color="primary" onClick={() => imageInput.current.click()}>
                    <input onChange={handleFileInput} ref={imageInput} hidden type="file" accept="image/**" />
                    <PhotoCamera/>
                </IconButton>

                <Button onClick={handleSubmit} disabled={content.length < 3 || !preview}>
                    post
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PostDialog;