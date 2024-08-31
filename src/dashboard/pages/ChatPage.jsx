import { useCallback, useContext, useEffect, useRef } from 'react';

import SendIcon from '@mui/icons-material/Send';
import { Grid, IconButton, TextField } from "@mui/material";
import ObjectId from 'bson-objectid';
import { useForm } from 'react-hook-form';

import { enqueueSnackbar } from 'notistack';
import { AuthContext } from '../../providers/AuthProvider';
import { AxiosContext } from '../../providers/AxiosProvider';
import { ChatContext } from '../../providers/ChatProvider';
import { SocketContext } from '../../providers/SocketProvider';
import ChatList from '../components/ChatList';

export default function ChatPage() {

    const { messages, setAllMessages, chatWith } = useContext(ChatContext);

    const { msgToReceive } = useContext(SocketContext);
    const { auth: {userId} } = useContext(AuthContext);
    const appAxios = useContext(AxiosContext);

    const { register, handleSubmit, resetField } = useForm();
    const endOfMessagesRef = useRef(null);


    useEffect(() => {
        if(!!msgToReceive) {
            setAllMessages(currMessages => [...currMessages, msgToReceive]);
        }
    }, [msgToReceive]);


    useEffect(() => {
        appAxios.get(`/messages/${userId}`, { useAuth: true })
        .then(resp => {
            setAllMessages(() => [...resp.data.messages]);
        })
        .catch(error => {
            console.log({error});
        });
    }, [userId]);


    const onSendMessage = useCallback( async({message}) => {
        const _id = ObjectId().toString();

        setAllMessages(currMessages => [
            ...currMessages, 
            { message, senderId: userId, receiverId: chatWith, _id: _id }
        ]);
        resetField('message');

        const resp = await appAxios.post('/messages', 
            { message, receiverId: chatWith, _id: _id }, 
            { useAuth: true, errorMsg: 'No se pudo enviar el mensaje' }
        )

        if(resp.status !== 200){
            setAllMessages( currMessages => currMessages.filter(msg => msg._id !== _id) )
        } 

    }, [userId, chatWith]);


    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollTop = endOfMessagesRef.current.scrollHeight;
        }
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
                ref={endOfMessagesRef}
            >
                <ChatList messages={messages}/>
            </Grid>

            <Grid 
                item
                component="form" 
                display="flex"
                onSubmit={handleSubmit(onSendMessage)}
            >
                <TextField 
                    type='text'
                    {...register('message', { required: true })}
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