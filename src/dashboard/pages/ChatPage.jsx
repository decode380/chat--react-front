import SendIcon from '@mui/icons-material/Send';
import { Grid, IconButton, TextField } from "@mui/material";

import { useCallback, useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../providers/SocketProvider';
import ChatList from '../components/ChatList';
import { AxiosContext } from '../../providers/AxiosProvider';
import { AuthContext } from '../../providers/AuthProvider';

export default function ChatPage() {

    const [messages, setMessages] = useState([]);

    const { msgToReceive } = useContext(SocketContext);
    const { auth: {userId} } = useContext(AuthContext);
    const appAxios = useContext(AxiosContext);

    useEffect(() => {
        if(!!msgToReceive) {
            setMessages(currMessages => [...currMessages, msgToReceive]);
        }
    }, [msgToReceive]);

    const onSendMessage = useCallback(async (evt) => {
        evt.preventDefault();

        const message = new FormData(evt.target).get('message');

        const receiverId = '66ccadd73de545e53670a2f8';
        setMessages(currMessages => [...currMessages, { message, from: userId }]);
        await appAxios.post('/messages', { message, receiverId }, { useAuth: true });
    }, [userId]);


    useEffect(() => {
        console.log({messages});
    }, [messages]);


    return (
        <Grid 
            container 
            flexDirection="column" 
            height="100%" 
            flexWrap='nowrap'
            spacing={1}
        >

            <Grid 
                item container
                flexGrow={1} 
                flexDirection='column' 
                spacing={2}
                overflow='auto'
                flexWrap='nowrap'
                padding={3}
            >
                <ChatList messages={messages}/>
            </Grid>

            <Grid 
                item
                component="form" 
                display="flex"
                onSubmit={onSendMessage}
            >
                <TextField 
                    type='text'
                    name='message'
                    required
                    sx={{ 
                        flexGrow: 1,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '16px', 
                        },

                    }}
                    InputProps={{
                        endAdornment: (
                            <IconButton 
                                position="end"
                                type="submit"
                            >
                                <SendIcon sx={{ color: 'primary.dark' }}/>
                            </IconButton>
                        ),
                    }}
                />
            </Grid>
        </Grid>
    );
}