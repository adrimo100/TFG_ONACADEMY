import React, {useEffect, useState} from "react";
import getState from "./flux";

export const Context = React.createContext(null) //Creates the context, with null as initial value for components without access to the provider

//This function injects the global store to any view/component
const injectContext = (PassedComponent) => {
    return (props) => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: {...state.actions}
                    }),
            })
        );

        useEffect(() => {
            /**
             * This function is the equivalent to "window.onLoad", it only runs once on the entire application lifetime
             * you should do your ajax requests or fetch api requests here. Do not use setState() to save data in the
             * store, instead use actions, like this:
             * state.actions.getAuthenticatedUser();
             **/
        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        )
    };
}

export default injectContext;
