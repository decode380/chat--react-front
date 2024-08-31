import { CssBaseline } from '@mui/material';
import { blueGrey, purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './providers/AuthProvider';
import { AxiosProvider } from './providers/AxiosProvider';
import { router } from "./router/AppRouter";
import { SnackbarProvider } from 'notistack';


function App() {

    const defaultTheme = createTheme({
        palette: {
            primary: blueGrey,
            secondary: purple,
        },
    });
    
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <AuthProvider>
                <AxiosProvider>
                    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
                        <CssBaseline/>
                        <RouterProvider  router={router}/>
                    </SnackbarProvider>
                </AxiosProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App;
