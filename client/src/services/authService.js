import * as request from "./requester";

const baseurl = 'http://localhost:3030/users';

export const login = async (loginData) => request.post(`${baseurl}/login`, loginData);

export const register = async (registerData) => request.post(`${baseurl}/register`, registerData);