import TextField  from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Box from "@mui/material/Box";

const AddComment = ({addComment}) => {
    const [content, setContent] = useState('');
    const handleInput = (event) => setContent(event.currentTarget.value);

    const send = () => {
        addComment(content);
        setContent('');
    }

    return (
        <Box display="flex">
            <TextField value={content} onChange={handleInput} fullWidth
                label="type comment" variant="outlined" size="small"/>
            <Button onClick={send} variant="contained" disabled={content.length < 3}>
                Send
            </Button>
        </Box>
    );
}

export default AddComment;