import { request } from "./requester";

const baseurl = 'http://localhost:3030/users';

export const login = (loginData) => request.post(`${baseurl}/login`, loginData);

export const register = (registerData) => request.post(`${baseurl}/register`, registerData);

export const logout = () => request.get(`${baseurl}/logout`);