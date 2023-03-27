import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/allMusic';

export const getAll = async () => {
    const result = await request.get(baseUrl);
    const music = Object.values(result);

    return music;
};

export const create = async (musicData, token) => {
    const result = await request.post(baseUrl, musicData, token);

    return result;
};

export const getOne = async (musicId) => {
    const result = await request.get(`${baseUrl}/${musicId}`);

    return result;
};

export const edit = async (musicId, data) => {
    const result = await request.put(`${baseUrl}/${musicId}`, data);

    return result;
};

export const deleteFunc = async (musicId) => {
    await request.del(`${baseUrl}/${musicId}`);
}