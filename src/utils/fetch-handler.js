import { getToken}  from "./token-handler";

export const fetchHandler =  (path, requestInit = {}, authenticated = false) => {
    const url = process.env.BACKEND_URL + path;
    const init = {
        headers: {},
        ...requestInit,
    };

    if (authenticated) {
        init.headers["Authorization"] = "Bearer " + getToken();
    }

    if (init.method === "POST" || init.method === "PUT") {
        init.body = JSON.stringify(init.body);
        init.headers["Content-Type"] = "application/json";
    }

    return fetch(url, init);
};

