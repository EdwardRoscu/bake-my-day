import React, {useState} from 'react';
import {Box, Button} from '@mui/material';
import Sidebar from './Sidebar';
import MyOrders from './MyOrders';
import Option2 from './Option2';
import {useLogout} from '../../hooks/useLogout';

const Profile = () => {
    const [view, setView] = useState('orders');
    const {logout} = useLogout();

    function handleViewChange(viewName) {
        setView(viewName);
    }

    return (
        <Box display="flex">
            <Sidebar view={view} onViewChange={handleViewChange}/>
            <Box flexGrow={1} display="flex" flexDirection="column">
                <Box display="flex" justifyContent="flex-end" mt={3} mr={3}>
                    <Button onClick={logout} variant="contained" color="error">
                        Logout
                    </Button>
                </Box>
                <Box width="80%" m="70px auto">
                    {view === 'orders' && <MyOrders/>}
                    {view === 'option2' && <Option2/>}
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;
