import React from 'react';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';

const Sidebar = ({ view, onViewChange }) => {
    return (
        <Box width="10%" m="100px 0 0 50px">
            <List>
                <ListItemButton selected={view === 'orders'} onClick={() => onViewChange('orders')}>
                    <ListItemText primary="Orders" />
                </ListItemButton>
                <ListItemButton selected={view === 'users'} onClick={() => onViewChange('users')}>
                    <ListItemText primary="Users" />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default Sidebar;
