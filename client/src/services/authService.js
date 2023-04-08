import { requestFactory } from "./requester";

const baseurl = 'https://react-music-project-service.onrender.com/users';

export const authServiceFactory = () => {
    const request = requestFactory();

    return {
        login: (loginData) => request.post(`${baseurl}/login`, loginData),
        register: (registerData) => request.post(`${baseurl}/register`, registerData),
        logout: () => request.get(`${baseurl}/logout`),
    }
};