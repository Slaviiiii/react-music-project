export const request = async (method, url, data) => {
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

    const response = await fetch(url, options);

    if (!response.ok) {
        const result = await response.json();

        throw result;
    }

    try {
        const result = await response.json();

        return result;
    } catch (err) {
        return {};
    }
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DEL');
export const patch = request.bind(null, 'PATCH');