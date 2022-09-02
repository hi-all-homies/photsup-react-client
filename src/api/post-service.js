import { performFetch, postJson } from "./fetch-utils";

export const PostService = {
    findPosts: (url) => {
        return performFetch(url, 'GET')
            .then(resp => resp.json());
    },

    savePost: (url, content, image) => {
        const formData = new FormData();
        formData.append('content', content);
        formData.append('image', image);

        return performFetch(url, 'POST', formData)
            .then(resp => resp.json());
    },

    updatePost: (url, content, image) => {
        const formData = new FormData();
        formData.append('content', content);
        if (image)
            formData.append('image', image);
        
        return performFetch(url, 'PUT', formData);
    },

    deletePost:(url) => {
        return performFetch(url, 'DELETE');
    },

    addLike:(url) => {
        return performFetch(url, 'POST');
    },

    findById:(url) => {
        return performFetch(url, 'GET')
            .then(resp => resp.json());
    },

    addComment:(url, body) => {
        return postJson(url, 'POST', body)
            .then(resp => resp.json());
    }
}