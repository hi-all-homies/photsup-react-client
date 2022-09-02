import { performFetch, postJson } from "./fetch-utils";

const UserService = {
    getUser: (url) => {
        return performFetch(url, 'GET')
            .then(resp => resp.json());
    },

    updateStatus: (url, status) => {
        return postJson(url, 'PUT', status);
    }
}

export default UserService;