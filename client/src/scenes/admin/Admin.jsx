import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Orders from './Orders';
import Users from './Users';

const Admin = () => {
    const [view, setView] = useState('orders'); // default to orders view

    function handleViewChange(viewName) {
        setView(viewName);
    }

    return (
        <Box display="flex" width="100%">
            <Sidebar view={view} onViewChange={handleViewChange} />
            <Box width="80%" m="100px auto">
                {view === 'orders' && <Orders />}
                {view === 'users' && <Users />}
            </Box>
        </Box>
    );
};

export default Admin;
