const request = async (method, token, url, data) => {
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

    if (token) {
        options.headers = {
            ...options.headers,
            'X-Authorization': token,
        };
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
        console.log(error.message);
    }
}

export const requestFactory = (token) => {
    if (!token) {
        const serializedAuth = localStorage.getItem("auth");

        if (serializedAuth && serializedAuth !== {}) {
            const auth = JSON.parse(serializedAuth);
            token = auth.accessToken;
        }
    }

    return {
        get: request.bind(null, 'GET', token),
        post: request.bind(null, 'POST', token),
        put: request.bind(null, 'PUT', token),
        del: request.bind(null, 'DELETE', token),
        patch: request.bind(null, 'PATCH', token)
    }
};