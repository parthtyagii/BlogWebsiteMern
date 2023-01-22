import React, { createContext, useContext } from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { Reducer } from './Reducer';


const initial_state = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: false
}


const BlogContext = createContext(initial_state);

const BlogContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(Reducer, initial_state);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
    }, [state.user]);

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