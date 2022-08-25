export const postDialogState = { postToWatch: null, isOpened: false };

export const postDialogReducer = (dialogState, action) => {
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