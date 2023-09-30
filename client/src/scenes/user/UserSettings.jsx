import React from 'react';
import {Box, Button} from '@mui/material';
import axios from "axios";
import {useLogout} from "../../hooks/useLogout";

const UserSettings = () => {
    const userId = localStorage.getItem('userId');
    const {logout} = useLogout();

    const handleDelete = async () => {
        try {
            logout();
            await axios.delete(`http://localhost:4000/api/users/${userId}`);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Box>
            <Button
                variant="contained"
                color="error"
                onClick={() => {
                    handleDelete();
                }}
            >
                Delete Account
            </Button>
        </Box>
    );
};

export default UserSettings;
