
export const useService = (serviceFactory) => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    const service = serviceFactory(auth.accessToken);

    return service;
};