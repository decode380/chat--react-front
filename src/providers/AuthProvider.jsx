import { createContext, useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider ({children}) {
    const [ auth, setAuth ] = useState({
        isLoading: false,
        token: null,
        userId: null
    });


    const setLoading = useCallback((isLoading) => {
        setAuth((currAuth) => ({
            ...currAuth,
            isLoading
        }));
    }, []);


    const setToken = useCallback((token) => {
        let userId = null;
        if(token === null) localStorage.removeItem('token');
        else {
            localStorage.setItem('token', token);
            userId = jwtDecode(token).id
        }

        setAuth((currAuth) => ({
            ...currAuth,
            token,
            userId
        }));       
    }, []);


    useEffect(() => {
        const tokenStorage = localStorage.getItem('token');
        setToken(tokenStorage);
    }, []);


    return (
        <AuthContext.Provider value={{ auth, setLoading, setToken}}>
            {children}
        </AuthContext.Provider>
    );
}

