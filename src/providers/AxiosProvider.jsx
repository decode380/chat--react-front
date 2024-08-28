import { createContext, useCallback, useContext, useEffect, useState } from "react";

import axios from "axios";

import { AuthContext } from "./AuthProvider";


export const AxiosContext = createContext();

export function AxiosProvider({ children }) {

    const [ axiosInstance ] = useState(() => 
        axios.create({
                baseURL: `${process.env.API_URL}/api`,
                headers: { "Content-Type": "application/json" },
        })
    );
    const { auth, setToken } = useContext(AuthContext);


    useEffect(() => {
        axios.interceptors.request.reject

        const tokenInterceptor = axiosInstance.interceptors.request.use(function (config) {
            if(config.useAuth) config.headers['authorization'] = auth.token;
            return config;
        })

        const unauthorizedInterceptor = axiosInstance.interceptors.response.use(null,function (response) {
            if(response.status === 401) {
                setToken(null);
            }
            return response;
        });

        return () => {
            axiosInstance.interceptors.request.eject(tokenInterceptor);
            axiosInstance.interceptors.response.eject(unauthorizedInterceptor);
        };
        
    }, [auth.token]);


    return (
        <AxiosContext.Provider value={axiosInstance}>
            {children}
        </AxiosContext.Provider>
    );
}