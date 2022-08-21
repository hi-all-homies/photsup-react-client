import jwt_decode from "jwt-decode";

export const AuthService = {
    storeUser:(jwt) => {
        let decoded = jwt_decode(jwt);
        let user = null;

        if (decoded){
        user = {
            id: decoded.id,
            username: decoded.username,
            avatarUrl: decoded.avatarUrl,
            uniqueKey: decoded.sub};
        
        const jsonUser = JSON.stringify(user);
        localStorage.setItem('user', jsonUser);
        localStorage.setItem('token', jwt);
        }
        return user;
    },

    getToken:() => {
        return localStorage.getItem('token');
    },

    getUser:() => {
        let user = null;
        let jsonUser = localStorage.getItem('user');

        if (jsonUser)
            user = JSON.parse(jsonUser);
        return user;
    },

    deleteUser:() => {
        localStorage.clear();
    }
}