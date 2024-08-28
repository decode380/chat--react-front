import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

import { AuthContext } from "../providers/AuthProvider";

export const SocketContext = createContext();

export function SocketProvider ({children}) {
    const [socket, setSocket] = useState();
    const [attempt, setAttempt] = useState(1);
    const [connFailed, setConnFailed] = useState(false);
    const [errorToken, setErrorToken] = useState('');

    const [msgToReceive, setMsgToReceive] = useState(undefined);

    const { auth, setToken } = useContext(AuthContext);

    // useEffect(() => {
    //     if (!socket) 
    //         setSocket( () =>
    //             io(process.env.API_URL, {
    //                 query: { token: auth.token },
    //                 reconnection: true,
    //                 reconnectionAttempts: 4,
    //                 reconnectionDelay: 1000
    //         }));

    //     return () => {
    //         console.log('disconnect')
    //         socket?.disconnect();
    //     }

    // }, []);


    useEffect(() => {
        
        const socket = io(process.env.API_URL, {
                    query: { token: auth.token },
                    reconnection: true,
                    reconnectionAttempts: 4,
                    reconnectionDelay: 1000
            });

        
        socket.on('connect_error', () => {
            setAttempt(currAttempt =>  currAttempt+1);
        });

        socket.on('connect_error_token', (err) => {
            setErrorToken(err);
            setToken(null);
            socket.disconnect();
        });

        socket.io.on('reconnect_failed', () => {
            setConnFailed(true);
            setToken(null);
            socket.disconnect();
        });

        socket.on('receive_msg', (msgObj) => {
            setMsgToReceive(msgObj);
        });

        socket.on('error_msg', (error) => {
            console.log(error);
        });

        return () => {
            console.log('disconnect')
            socket.disconnect();
        }

    }, [auth.token]);


    return (
        <SocketContext.Provider value={{ msgToReceive }}>
            {children}
        </SocketContext.Provider>
    );
}