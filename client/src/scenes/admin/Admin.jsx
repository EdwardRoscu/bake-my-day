import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Sidebar from './Sidebar';
import Orders from './Orders';
import Users from './Users';
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('orders');

    function handleViewChange(viewName) {
        setView(viewName);
    }

    function handleLogout() {
        localStorage.removeItem('jwt');
        navigate("/auth/login");
    }

    return (
        <Box display="flex">
            <Sidebar view={view} onViewChange={handleViewChange} />
            <Box flexGrow={1} display="flex" flexDirection="column">
                <Box display="flex" justifyContent="flex-end" mt={3} mr={3}>
                    <Button onClick={handleLogout} variant="contained" color="error">
                        Logout
                    </Button>
                </Box>
                <Box width="80%" m="70px auto">
                    {view === 'orders' && <Orders />}
                    {view === 'users' && <Users />}
                </Box>
            </Box>
        </Box>
    );
};

export default Admin;
