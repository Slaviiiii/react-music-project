import { requestFactory } from "./requester";

const baseUrl = 'http://localhost:3030/data/likes';

export const likeServiceFactory = () => {
    const request = requestFactory();

    const addLike = async (data) => {
        const result = await request.post(baseUrl, data);

        return result;
    };

    const getAll = async (musicId) => {
        const query = encodeURIComponent(`musicId="${musicId}"`);

        const result = await request.get(`${baseUrl}?where=${query}`);

        if (result === "Resource not found" || !result) {
            return [];
        }
        const likes = Object.values(result);

        return likes;
    };

    const removeLike = async (id) => {
        await request.del(`${baseUrl}/${id}`);
    };

    return {
        addLike,
        getAll,
        removeLike
    };
};