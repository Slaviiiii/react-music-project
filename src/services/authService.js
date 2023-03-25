import * as request from "./requester";

const baseurl = 'http://localhost:3030/users';

export const login = async (loginData) => request.post(`${baseurl}/login`, loginData); 
