import { AuthService } from "../api/auth-service";

export const initUserState = (initialState) => {
    return AuthService.getUser();
}
  
export const userReducer = (user, action) => {
    switch(action.type){
      case 'login':
        return AuthService.getUser();
      case 'logout':{
        AuthService.deleteUser();
        return null;
      }
      default:
        return null;
    }
}