import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AxiosContext } from "./AxiosProvider";
import { enqueueSnackbar } from "notistack";

export const ChatContext = createContext();

export function ChatProvider({children}) {
    
    const axiosApp = useContext(AxiosContext)

    const [allMessages, setAllMessages] = useState([]);
    const [chatWith, setChatWith] = useState('');
    const [users, setUsers] = useState([]);
    const messages = 
        useMemo(() => 
            allMessages.filter(msg => msg.senderId === chatWith || msg.receiverId === chatWith ),
        [allMessages, chatWith]);


    useEffect(() => {
        axiosApp.get('/user/getAll', { useAuth: true, errorMsg: 'No se pudo obtener usuarios' })
        .then(resp => {
            if(resp.status === 200) {
                setUsers(() => resp.data.users);
            }
         });
    }, []);

    useEffect(() => {
        if(chatWith === '' && allMessages.length > 0 && users.length > 0)
            setChatWith(users[0]['_id']);
    }, [allMessages, users, chatWith]);


    return (
        <ChatContext.Provider value={{messages, setAllMessages, chatWith, setChatWith, users}}>
            {children}
        </ChatContext.Provider>
    );
}