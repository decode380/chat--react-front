import { useState } from "react";

import { Box, Toolbar } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

import ChatsDrawer from "../components/ChatsDrawer";
import Header from "../components/Header";
import { ChatProvider } from "../../providers/ChatProvider";


export default function DashboardLayout() {

    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <ChatProvider>
            <Box sx={{ 
                width: '100vw', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end'
            }}>

                <Header 
                    mobileOpen={mobileOpen} 
                    setMobileOpen={setMobileOpen}
                />

                <ChatsDrawer 
                    mobileOpen={mobileOpen} 
                    setMobileOpen={setMobileOpen}
                    bgcolor={blueGrey[100]}
                />

                <Toolbar/>
                <Box 
                    sx={{ 
                        p: 1, 
                        width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` }, 
                        height: '100%',
                        overflow: 'auto'
                    }}
                >
                    <Outlet/>
                </Box>
            </Box>
        </ChatProvider>
    );
}