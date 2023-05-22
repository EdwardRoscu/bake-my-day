import React, { useEffect, useState } from 'react';
import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material';

const Sidebar = ({ view, onViewChange }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <Box width="10%" minHeight={650} boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)">
            {user &&
                <Box pt={5} pb={2} pl={2}>
                    <Typography variant="h5">{user.username}</Typography>
                </Box>}
            <List>
                <ListItemButton selected={view === 'option1'} onClick={() => onViewChange('option1')} style={{ margin: '20px 0' }}>
                    <ListItemText primary="Option 1" primaryTypographyProps={{ style: { fontSize: '18px' } }} />
                </ListItemButton>
                <ListItemButton selected={view === 'option2'} onClick={() => onViewChange('option2')} style={{ margin: '20px 0' }}>
                    <ListItemText primary="Option 2" primaryTypographyProps={{ style: { fontSize: '18px' } }} />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default Sidebar;
