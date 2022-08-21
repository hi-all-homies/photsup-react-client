import { AuthService } from "./auth-service";
import { performFetch } from "./fetch-utils";

const UserService = {
    getUser: (url) => {
        return performFetch(url, 'GET')
            .then(resp => resp.json());
    },

    updateStatus: (url, status) => {
        const token = AuthService.getToken();
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Auth-Token': token
            },
            body: JSON.stringify(status)
        });
    }
}

export default UserService;