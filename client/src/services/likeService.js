import { requestFactory } from "./requester";

const baseUrl = 'http://localhost:3030/data/likes';

export const likeServiceFactory = () => {
    const request = requestFactory();

    const addLike = async (data) => {
        const result = await request.post(baseUrl, data);

        return result;
    }

    return {
        addLike
    };
};