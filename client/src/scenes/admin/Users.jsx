import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {useFetch} from "../../hooks/useFetch";

const Users = () => {
    const users = useFetch("http://localhost:4000/api/users");

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: '16px', width: '20%' }}>User ID</TableCell>
                        <TableCell sx={{ fontSize: '16px', width: '40%' }}>Username</TableCell>
                        <TableCell sx={{ fontSize: '16px', width: '40%' }}>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row" sx={{ fontSize: '14px' }}>
                                {user.id}
                            </TableCell>
                            <TableCell sx={{ fontSize: '14px' }}>
                                {user.username}
                            </TableCell>
                            <TableCell sx={{ fontSize: '14px' }}>
                                {user.email}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Users;
