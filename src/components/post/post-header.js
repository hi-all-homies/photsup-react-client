import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { useContext, useState } from 'react';
import { UserContext } from '../../pages/App';
import { FunctionsContext } from '../../pages/Home';


const PostHeader = ({post, openPostDialog, deletePost}) => {
    const user = useContext(UserContext);
    const functions = useContext(FunctionsContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = (event) => setAnchorEl(event.currentTarget);
    const menu = Boolean(anchorEl);

    const edit = () => {
        openPostDialog('update', post);
        setAnchorEl(null);
    }

    const removePost = () => {
        deletePost(post.postId);
        setAnchorEl(null);
    }

    const showAuthor = () => {
        functions.openUserDialog(post.author.uniqueKey);
    }

    return (
        <>
        <CardHeader avatar={
            <Avatar alt="ava" onClick={showAuthor} src={post.author.avatarUrl} sx={{ bgcolor: red[500], cursor: 'pointer' }}>
                {post.author.username.charAt(0)}
            </Avatar>}
            action={user.uniqueKey === post.author.uniqueKey &&
                <IconButton onClick={openMenu}>
                    <MoreVertIcon/>
                </IconButton>
            }

            title={post.author.username}
            subheader={post.created}
           />
            <Menu anchorEl={anchorEl} open={menu} onClose={()=>setAnchorEl(null)}>
                <MenuItem onClick={edit}>
                    <EditIcon/> edit
                </MenuItem>
                <MenuItem onClick={removePost}>
                    <DeleteForeverIcon/> delete
                </MenuItem>
            </Menu>
        </>
    );
}

export default PostHeader;