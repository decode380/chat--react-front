import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "../auth/LoginPage";
import DashboardLayout from "../dashboard/layouts/DashboardLayout";
import ChatPage from "../dashboard/pages/ChatPage";
import ProtectRoute from "./ProtectRoute";
import { SocketProvider } from "../providers/SocketProvider";


export const router = createBrowserRouter([
    {
        path: '/dashboard',
        element: <ProtectRoute> <SocketProvider><DashboardLayout/></SocketProvider> </ProtectRoute>,
        children: [
            {
                path: '',
                element: <ChatPage/>
            }
        ]
    },
    {
        path: '/login',
        element: <ProtectRoute isPublic> <LoginPage/> </ProtectRoute>
    },
    {
        path: '*',
        element: <Navigate to={'/dashboard'}/>
    }
]);