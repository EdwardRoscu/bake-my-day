import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, List, ListItemButton, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';

const Admin = () => {
    const [view, setView] = useState('orders'); // default to orders view
    const [orders, setOrders] = useState([]);
    const items = useSelector((state) => state.cart.items);

    async function getOrders() {
        const response = await fetch(
            "http://localhost:4000/api/orders",
            { method: 'GET' }
        );
        const ordersJson = await response.json();
        setOrders(ordersJson.data);
    }

    useEffect(() => {
        getOrders();
    }, []);

    function getProductName(productId) {
        const item = items.find(item => item.id === productId);
        return item && item.attributes && item.attributes.name ? item.attributes.name : 'N/A';
    }

    function handleViewChange(viewName) {
        setView(viewName);
    }

    return (
        <Box display="flex" width="100%">
            <Box width="10%" m="100px 0 0 50px">
                <List>
                    <ListItemButton selected={view === 'orders'} onClick={() => handleViewChange('orders')}>
                        <ListItemText primary="Orders" />
                    </ListItemButton>
                    <ListItemButton selected={view === 'users'} onClick={() => handleViewChange('users')}>
                        <ListItemText primary="Users" />
                    </ListItemButton>
                </List>
            </Box>
            <Box width="80%" m="100px auto">
                {view === 'orders' && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: '16px' }}>Order ID</TableCell>
                                    <TableCell align="center" sx={{ fontSize: '16px' }}>User Name</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '16px' }}>Products</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell component="th" scope="row" sx={{ fontSize: '14px' }}>
                                            {order.id}
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontSize: '14px' }}>
                                            {order.attributes.userName}
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontSize: '14px' }}>
                                            {order.attributes.products.map((product) => (
                                                <div key={product.id}>
                                                    {product.count} {getProductName(product.id)}
                                                </div>
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {view === 'users' && (
                    <Box>
                        <h2>Users</h2>
                        <p>Coming soon...</p>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Admin;
