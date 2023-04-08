import { requestFactory } from "./requester";

const baseUrl = "https://react-music-project-service.onrender.com/data/comments";

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

    const deleteFunc = async (commentId) => {
        await request.del(`${baseUrl}/${commentId}`);
    }

    const edit = async (commentId, data) => {
        const result = await request.put(`${baseUrl}/${commentId}`, data);

        return result;
    }

    return {
        getAll,
        create,
        deleteFunc,
        edit,
    };
}
