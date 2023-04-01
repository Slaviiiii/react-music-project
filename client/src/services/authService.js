import { requestFactory } from "./requester";

const baseurl = 'http://localhost:3030/users';


export const authServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        login: (loginData) => request.post(`${baseurl}/login`, loginData),
        register: (registerData) => request.post(`${baseurl}/register`, registerData),
        logout: () => request.post(`${baseurl}/logout`),
    }
};