import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {useFetch} from "../../hooks/useFetch";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import {useEffect, useState} from "react";

const AllUsers = () => {
    const fetchedUsers = useFetch('http://localhost:4000/api/users');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(fetchedUsers);
    }, [fetchedUsers]);

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:4000/api/users/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontSize: '16px', width: '15%'}}>User ID</TableCell>
                        <TableCell sx={{fontSize: '16px', width: '30%'}}>Username</TableCell>
                        <TableCell sx={{fontSize: '16px', width: '45%'}}>Email</TableCell>
                        <TableCell sx={{fontSize: '16px', width: '10%', textAlign: 'center'}}>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row" sx={{fontSize: '14px'}}>
                                {user.id}
                            </TableCell>
                            <TableCell sx={{fontSize: '14px'}}>
                                {user.username}
                            </TableCell>
                            <TableCell sx={{fontSize: '14px'}}>
                                {user.email}
                            </TableCell>
                            <TableCell align="center">
                                <IconButton
                                    color="error"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AllUsers;
