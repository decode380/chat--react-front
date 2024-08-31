import { useContext } from "react";

import { Drawer, List, ListItemButton, Toolbar, Typography } from "@mui/material";

import { ChatContext } from "../../providers/ChatProvider";

export default function ChatsDrawer({mobileOpen, setMobileOpen, bgcolor}) {
    const drawerWidth = 240;
    const { setChatWith, users, chatWith } = useContext(ChatContext);

    const drawer = (
        <>
            <Toolbar/>
            <Typography 
                component="h2" 
                variant="h6" 
                sx={{ mt: 2 }} 
                textAlign="center"
                color="primary.dark"
            >
                Usuarios conectados
            </Typography>
            {
                users.map( user => (
                    <List key={user._id}>
                        <ListItemButton 
                            onClick={() => {setChatWith(user._id)}} 
                            selected={chatWith === user._id}
                            sx={{
                                '&.Mui-selected, &.Mui-selected:hover': {
                                    backgroundColor: 'primary.main',
                                    color: '#fff'
                                }
                            }}
                        >
                            {user.username}
                        </ListItemButton>
                    </List>
                ))
            }
        </>
    );

    return (
        <>
            {/* Mobile */}
            <Drawer
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor },
                }}
            >
                {drawer}
            </Drawer>

            {/* Desktop */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor},
                }}
                open
            >
                {drawer}
            </Drawer>
        </>
    )


}