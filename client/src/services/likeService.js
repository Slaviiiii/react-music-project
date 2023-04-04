import { requestFactory } from "./requester";

const baseUrl = 'http://localhost:3030/data/likes';

export const likeServiceFactory = () => {
    const request = requestFactory();

    const addLike = async (data) => {
        const result = await request.put(`${baseUrl}/${data._id}`, data);

        return result;
    }

    return {
        addLike
    };
};