import { requestFactory } from "./requester";

const baseUrl = 'https://react-music-project-service.onrender.com/data/allMusic';

export const musicServiceFactory = () => {
    const request = requestFactory();

    const getAll = async () => {
        const result = await request.get(baseUrl);
        if (!result) {
            return [];
        }
        const music = Object.values(result);

        return music;
    };

    const create = async (musicData) => {
        const result = await request.post(baseUrl, musicData);

        return result;
    };

    const getOne = async (musicId) => {
        const result = await request.get(`${baseUrl}/${musicId}`);

        return result;
    };

    const edit = async (musicId, data) => {
        const result = await request.put(`${baseUrl}/${musicId}`, data);

        return result;
    };

    const deleteFunc = async (musicId) => {
        await request.del(`${baseUrl}/${musicId}`);
    };

    return {
        getAll,
        create,
        getOne,
        edit,
        deleteFunc
    };
};