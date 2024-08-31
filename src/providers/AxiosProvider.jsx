import { createContext, useCallback, useContext, useEffect, useState } from "react";

import axios from "axios";

import { AuthContext } from "./AuthProvider";
import { enqueueSnackbar } from "notistack";


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

        const tokenInterceptor = axiosInstance.interceptors.request.use(function (config) {
            if(config.useAuth) config.headers['authorization'] = auth.token;
            return config;
        }, 
        // error => Promise.reject(error)
        )

        const unauthorizedInterceptor = axiosInstance.interceptors.response.use(null,function (error) {
            let errorMessage = error.config.errorMsg ?? 'Ocurrió un error';

            if(error.status === 401) {
                errorMessage = 'Error de autorización'
                setToken(null);
            }
            enqueueSnackbar(errorMessage, { style: {background: '#f44336'} });

            // return Promise.reject(new Error(error));
            return error;
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