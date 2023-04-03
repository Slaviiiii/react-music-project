import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data/comments";

export const commentServiceFactory = () => {
    const request = requestFactory();

    const getAll = async (musicId) => {
        const query = encodeURIComponent(`musicId="${musicId}"`);

        const result = await request.get(`${baseUrl}?where=${query}`);
        const comments = Object.values(result);

        return comments;
    };

    const create = async (musicId, comment, username) => {
        const result = await request.post(baseUrl, { musicId, comment, username });

        return result;
    };

    return {
        getAll,
        create,
    };
}
