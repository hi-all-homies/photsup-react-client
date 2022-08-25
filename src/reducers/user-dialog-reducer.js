export const userDialogInitState = { userToWatch: null, isOpened: false };

export const userDialogReducer = (dialogState, action) => {
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