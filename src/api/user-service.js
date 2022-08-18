import { performFetch } from "./fetch-utils";

const UserService = {
    getUser: (url) => {
        return performFetch(url, 'GET')
            .then(resp => resp.json());
    }
}

export default UserService;