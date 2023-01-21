import React, { createContext, useContext } from 'react';
import { useReducer } from 'react';


const initial_state = {
    user: null,
    isFetching: false,
    error: false
}


const BlogContext = createContext(initial_state);

const BlogContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(Reducer, initial_state);

    return (
        <BlogContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}
        </BlogContext.Provider>
    );
}

export { BlogContextProvider, BlogContext };