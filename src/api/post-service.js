import { AuthService } from "./auth-service";

const performFetch = async (url, method, body) => {
    const token = AuthService.getToken();

    const resp = await fetch(url, {
        method: method,
        headers: { 'X-Auth-Token': token },
        body: body
    });

    return await resp.json();
}

export const PostService = {

    findPosts: (url) => {
        return performFetch(url, 'GET');
    },

    savePost: (url, content, image) => {
        const formData = new FormData();
        formData.append('content', content);
        formData.append('image', image);

        return performFetch(url, 'POST', formData);
    }
}