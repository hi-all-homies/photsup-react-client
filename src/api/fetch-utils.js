import { AuthService } from "./auth-service";

export const performFetch = (url, method, body) => {
    const token = AuthService.getToken();

    return fetch(url, {
        method: method,
        headers: { 'X-Auth-Token': token },
        body: body
    }).then(
        resp => resp,
        reason => console.log(reason));

}