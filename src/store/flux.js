import {fetchHandler} from "../utils/fetchHandler";
import toast from "react-hot-toast";

const getState = ({getStore, getActions, setStore}) => {

    return {
        store: {user: {}},
        actions: {
            createUser: async (newUser) => {
                fetchHandler("/api/user", {
                    method: "POST",
                    body: newUser,
                })
                    .then(res => {
                        if (!res.ok) {
                            return res.json().then(data => {
                                throw new Error(data.message || 'Could not create user');
                            });
                        }
                        return res.json();
                    })
                    .then(data => {
                        toast("Usuario creado con éxito", {type: "success"});
                    })
                    .catch(e => {
                        console.error('Error:', e);
                        toast(e.message,{type: "error"});
                    });
            }
        }
    }
}

export default getState;
