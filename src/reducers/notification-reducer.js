export const notificationInitState = {
    isOpened: false,
    message: ''
};

export const notificationReducer = (state, action) => {
    switch(action.type){
        case 'open':
            return {
                isOpened: true,
                message: `${action.payload}`
            };
        case 'close':
            return notificationInitState;
        default:
            return state;
    }
}