import {Card, CardContent, CardActions, Button, Typography} from "@mui/material";

const Post = (props) => {

    return (
        <Card sx={{mt: "2rem"}}>
            <CardContent>
                <Typography variant="h4">
                    {props.post.title}
                </Typography>
                <Typography>
                    {props.post.body}
                </Typography>
            </CardContent>

            <CardActions>
                <Button onClick={props.delete}>Delete</Button>
            </CardActions>
        </Card>
    );
}

export default Post;