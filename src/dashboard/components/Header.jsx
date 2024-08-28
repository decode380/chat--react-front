import { useContext, useState } from "react";

import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";

import { AuthContext } from "../../providers/AuthProvider";
                    

export default function Header({mobileOpen, setMobileOpen}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const { setToken } = useContext(AuthContext);

    const onLogOut = () => {
        setToken(null);
    }

    return (
        <AppBar 
            position="fixed"
            sx={{
                bgcolor: 'primary.dark',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar>
                <Grid container>
                    <Grid 
                        item 
                        flexGrow={1} 
                        display="flex" 
                        flexDirection="row"
                        alignItems="center"
                    >
                        <IconButton
                            onClick={() => setMobileOpen(!mobileOpen)}
                            sx={{ display: { xs: 'block', sm: 'none' } }}
                        >
                            <ChatIcon 
                                sx={{ color: '#fff' }}
                            />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                        >
                            Chats
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton 
                            onClick={evt => setAnchorEl(evt.currentTarget)}
                        >
                            <PersonIcon sx={{ color:'#fff' }}/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                        >
                            <MenuItem onClick={onLogOut}>Logout</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}