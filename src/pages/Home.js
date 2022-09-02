import React, { useReducer, useEffect } from "react";
import { Outlet } from "react-router-dom";
import CustomSnack from "../components/custom-snack";
import { notificationInitState, notificationReducer } from "../reducers/notification-reducer";
import { WebSocketService } from "../api/websocket-service";
import UserDialog from "../components/dialogs/user-dialog";
import { userDialogInitState, userDialogReducer } from "../reducers/user-dialog-reducer";
import UserService from "../api/user-service";
import { PostService } from '../api/post-service';


const socketUrl = `${process.env.REACT_APP_SOCKET}`;
const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

export const FunctionsContext = React.createContext({
    openUserDialog: (uniqueKey) => {},
    addLike: (url) => {}
});

const Home = () => {
    const [notification, dispatchNotification] =
        useReducer(notificationReducer, notificationInitState);

    const [dialogState, dispatch] = useReducer(userDialogReducer, userDialogInitState);


    const handleLikeNotification = (message) => {
        let payload = `${message.liker} has just liked one of your posts`;
        dispatchNotification({type: 'open', payload: payload});
    }

    const openUserDialog = (uniqueKey) => {
        UserService.getUser(`${baseUrl}/users/${uniqueKey}`)
            .then(u => dispatch({type: 'open', payload: u}));
    };

    const addLike = (url) => {
        return PostService.addLike(url)
            .then(resp => resp.json());
    }


    useEffect(() => {
        WebSocketService.startListen(`${socketUrl}/notify`);
        WebSocketService.subscribe(handleLikeNotification);
        return () => {
            WebSocketService.unsubscribe(handleLikeNotification);
            WebSocketService.stopListen();
        };
    },[])

    
    return (
        <FunctionsContext.Provider value={{ openUserDialog: openUserDialog, addLike: addLike }}>
        <UserDialog shownUser={dialogState.userToWatch} open={dialogState.isOpened}
            close={() => dispatch({type: 'close'})}/>

        <CustomSnack open={notification.isOpened} message={notification.message}
                closeSnack={() => dispatchNotification({type: 'close'})} severity="info" />
        <Outlet/>
        </FunctionsContext.Provider>
    );
}

export default Home;