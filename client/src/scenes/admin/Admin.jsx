import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {setItems} from "../../state";

const Admin = () => {
    const [orders, setOrders] = useState([]);
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    async function getOrders() {
        const response = await fetch(
            "http://localhost:4000/api/orders",
            { method: 'GET' }
        );
        const ordersJson = await response.json();
        setOrders(ordersJson.data);
    }

    async function getItems() {
        const items = await fetch(
            "http://localhost:4000/api/items",
            { method: "GET" }
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
    }

    useEffect(() => {
        getOrders();
        getItems();
    }, []);

    function getProductName(productId) {
        const item = items.find(item => item.id === productId);
        return item && item.attributes && item.attributes.name ? item.attributes.name : 'N/A';
    }

    return (
        <Box width="90%" m="100px auto">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '16px' }}>Order ID</TableCell>
                            <TableCell align="right" sx={{ fontSize: '16px' }}>User Name</TableCell>
                            <TableCell align="right" sx={{ fontSize: '16px' }}>Products</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell component="th" scope="row" sx={{ fontSize: '14px' }}>
                                    {order.id}
                                </TableCell>
                                <TableCell align="right" sx={{ fontSize: '14px' }}>{order.attributes.userName}</TableCell>
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
        </Box>
    );
};

export default Admin;
