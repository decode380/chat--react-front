import { useContext } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useFormErrorText } from '../hooks/useFormErrorText';
import { AuthContext } from '../providers/AuthProvider';
import { AxiosContext } from '../providers/AxiosProvider';

export default function LoginPage() {

    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: {username: 'JohnDoe', password: '1234'}});
    const appAxios = useContext(AxiosContext); 
    const { setLoading, setToken } = useContext(AuthContext); 

    const usernameErrorText = useFormErrorText(errors.username);
    const passwordErrorText = useFormErrorText(errors.password);

    const handleLoginSuccess = ({data}) => {
        setToken(data.token);
    };

    const handleLoginError = (error) => {
        console.error(error.response.data.msg)
    };

    const onLogin = (data) => {
        setLoading(true);

        appAxios.post('/auth/login', data)
            .then(handleLoginSuccess)
            .catch(handleLoginError)
            .finally(() => setLoading(false));
    };
    
    return (
        <Container
            component='main'
            maxWidth='xs'
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 8
                }}
            >
                <Avatar sx={{ mb: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <Box 
                    component='form' 
                    onSubmit={handleSubmit(onLogin)}  
                    noValidate 
                    sx={{ mt:3, width: '100%'}}
                >
                    <TextField
                        type='text'
                        fullWidth
                        required
                        label='Username'
                        autoComplete='username'
                        autoFocus
                        {...register("username", { required: true, minLength: 4, maxLength: 18 })}
                        error={!!errors.username}
                        helperText={usernameErrorText}
                    />
                    <TextField
                        sx={{ mt:3 }}
                        type='password'
                        fullWidth
                        required
                        label='Password'
                        autoComplete='password'
                        {...register("password", { required: true, minLength: 4, maxLength: 18 })}
                        error={!!errors.password}
                        helperText={passwordErrorText}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3 }}
                    >
                        SIGN IN
                    </Button>
                </Box>
                <Typography
                    color='text.secondary'
                    variant='body2'
                    align='center'
                    sx={{ mt: 3 }}
                >
                    { 'Develop by ' }
                    <Link color='inherit' href='https://miguelfandino.com'>
                        Miguel Fandino
                    </Link>
                </Typography>
            </Box>
        </Container>
    )
}