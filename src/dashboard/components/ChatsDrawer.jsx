import { Drawer, List, ListItemButton, Toolbar, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

export default function ChatsDrawer({mobileOpen, setMobileOpen, bgcolor}) {
    const drawerWidth = 240;

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
                ['Usuario 1', 'Usuario 2', 'Usuario 3'].map( user => (
                    <List key={user}>
                        <ListItemButton>
                        {user}
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