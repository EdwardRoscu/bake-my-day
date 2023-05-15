import React from 'react';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';

const Sidebar = ({ view, onViewChange }) => {
    return (
        <Box width="10%" minHeight={650} boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)">
            <List>
                <ListItemButton selected={view === 'orders'} onClick={() => onViewChange('orders')} style={{ margin: '20px 0' }}>
                    <ListItemText primary="Orders" primaryTypographyProps={{ style: { fontSize: '18px' } }} />
                </ListItemButton>
                <ListItemButton selected={view === 'users'} onClick={() => onViewChange('users')} style={{ margin: '20px 0' }}>
                    <ListItemText primary="Users" primaryTypographyProps={{ style: { fontSize: '18px' } }} />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default Sidebar;
