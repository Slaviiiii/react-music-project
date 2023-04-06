const request = async (method, url, data) => {
    const options = {};

    if (method !== 'GET') {
        options.method = method;

        if (data) {
            options.headers = {
                'content-type': 'application/json',
            };
            options.body = JSON.stringify(data);
        }
    }

    const serializedAuth = localStorage.getItem("auth");
    if (serializedAuth) {
        const auth = JSON.parse(serializedAuth);
        if (auth.accessToken) {
            options.headers = {
                ...options.headers,
                'X-Authorization': auth.accessToken,
            };
        }
    }

    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            if (res.status === 403) {
                localStorage.removeItem("auth");
            }
            const err = await res.json();
            throw new Error(err.message);
        }

        if (res.status === 204) {
            return {};
        }

        const result = await res.json();

        if (!res.ok) {
            throw result;
        }

        return result;
    } catch (error) {
        return error.message;
    }
}

export const requestFactory = () => {
    return {
        get: request.bind(null, 'GET'),
        post: request.bind(null, 'POST'),
        put: request.bind(null, 'PUT'),
        del: request.bind(null, 'DELETE'),
        patch: request.bind(null, 'PATCH')
    }
};