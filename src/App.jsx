import { CssBaseline } from '@mui/material';
import { blueGrey, purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './providers/AuthProvider';
import { AxiosProvider } from './providers/AxiosProvider';
import { router } from "./router/AppRouter";


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
                    <CssBaseline/>
                    <RouterProvider  router={router}/>
                </AxiosProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App;
