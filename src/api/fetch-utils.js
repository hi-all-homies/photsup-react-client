import { AuthService } from "./auth-service";

const handleResponse = (resp) => {
    if (resp.status === 403)
        AuthService.deleteUser();
    return resp;
};

const handleError = (err) => console.log('server isnt available');

export const performFetch = (url, method, body) => {
    const token = AuthService.getToken();
    const reqInit = {
        method: method,
        headers: { 'X-Auth-Token': token },
        body: body
    };

    return fetch(url, reqInit)
        .then(handleResponse)
        .catch(handleError);
};

export const postJson = (url, method, body) => {
    const token = AuthService.getToken();
    const reqInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-Auth-Token': token
        },
        body: JSON.stringify(body)
    };

    return fetch(url, reqInit)
        .then(handleResponse)
        .catch(handleError);
}