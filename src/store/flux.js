
const getState = ({getStore, getActions, setStore}) => {
    const backendUrl = process.env.BACKEND_URL;

    return {
        store: {user: {}},
        actions: {
            createUser: async (newUser) => {
                alert("creating new user")
            }
        }
    }
}

export default getState;
