import {fetchHandler} from "../utils/fetchHandler";
import toast from "react-hot-toast";
import {removeToken, setToken} from "../utils/tokenHandler";

const getState = ({getStore, getActions, setStore}) => {

    return {
        store: {user: null},
        actions: {
            createUser: async (newUser) => {
                fetchHandler("/api/user", {
                    method: "POST",
                    body: newUser,
                })
                    .then(res => {
                        if (!res.ok) {
                            return res.text().then(data => {
                                throw new Error(data || 'Could not create user');
                            });
                        }

                        return res.text();
                    })
                    .then(data => {
                        toast("Usuario creado con éxito", {type: "success"});

                        window.location.replace("/login");
                    })
                    .catch(e => {
                        console.error('Error:', e);
                        toast(e.message,{type: "error"});
                    });
            },
            loginUser: async (userCredentials) => {
                fetchHandler("/api/user/login", {
                    method: "POST",
                    body: userCredentials,
                })
                    .then(res => {
                        if (!res.ok) {
                            return res.text().then(data => {
                                throw new Error(data || 'Could not login');
                            });
                        }

                        return res.json();
                    })
                    .then(data => {
                        toast("Sesión iniciada con éxito", {type: "success"});

                        setStore({
                            user: {
                                id: data.id,
                                name: data.name,
                                email: data.email,
                            }
                        })

                        setToken(data.token)

                        window.location.replace("/");
                    })
                    .catch(e => {
                        console.error('Error:', e);
                        toast(e.message,{type: "error"});
                    });
            },
            getAuthenticatedUser: (token) => {
                fetchHandler(`/api/user/token/${token}`, {
                    method: "GET",
                })
                    .then(res => {
                        if (!res.ok) {
                            return res.text().then(data => {
                                throw new Error(data || 'Could not recover authenticated user');
                            });
                        }

                        return res.json();
                    })
                    .then(data => {

                        setStore({
                            user: {
                                id: data.id,
                                name: data.name,
                                email: data.email,
                            }
                        })

                    })
                    .catch(e => {
                        console.error('Error:', e);
                    });
            },
            closeSession: () => {
                removeToken()
                setStore({user: null})
            }
        }
    }
}

export default getState;
