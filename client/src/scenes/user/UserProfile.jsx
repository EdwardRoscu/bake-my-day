import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import UserSidebar from './UserSidebar';
import UserOrders from './UserOrders';
import UserSettings from './UserSettings';
import {useLogout} from '../../hooks/useLogout';

const UserProfile = () => {
    const [view, setView] = useState(localStorage.getItem('userView') || 'orders');
    const {logout} = useLogout();

    useEffect(() => {
        localStorage.setItem('userView', view);
    }, [view]);

    function handleViewChange(viewName) {
        setView(viewName);
    }

    return (
        <Box display="flex">
            <UserSidebar view={view} onViewChange={handleViewChange}/>
            <Box flexGrow={1} display="flex" flexDirection="column">
                <Box display="flex" justifyContent="flex-end" mt={3} mr={3}>
                    <Button onClick={logout} variant="contained" color="error">
                        Logout
                    </Button>
                </Box>
                <Box width="80%" m="70px auto">
                    {view === 'orders' && <UserOrders/>}
                    {view === 'settings' && <UserSettings/>}
                </Box>
            </Box>
        </Box>
    );
};

export default UserProfile;
