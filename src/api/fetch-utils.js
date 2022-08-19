import { AuthService } from "./auth-service";

export const performFetch = (url, method, body) => {
    const token = AuthService.getToken();
    const reqInit = {
        method: method,
        headers: { 'X-Auth-Token': token },
        body: body
    };

    return fetch(url, reqInit)
        .then(resp => {
            if (resp.status === 403)
                AuthService.deleteUser();
            return resp})
        .catch(err => console.log('server isnt available'));
}