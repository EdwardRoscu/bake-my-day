import React, { useState, useEffect, useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {setItems} from "../../state";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const getOrders = useCallback(async () => {
        const response = await fetch(
            "http://localhost:4000/api/orders",
            { method: 'GET' }
        );
        const ordersJson = await response.json();
        setOrders(ordersJson.data);
    }, []);

    const getItems = useCallback(async () => {
        const items = await fetch(
            "http://localhost:4000/api/items",
            { method: "GET" }
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
    }, [dispatch]);

    useEffect(() => {
        getOrders();
        getItems();
    }, [getOrders, getItems]);

    function getProductName(productId) {
        const item = items.find(item => item.id === productId);
        return item && item.attributes && item.attributes.name ? item.attributes.name : 'N/A';
    }

    return (
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
    );
};

export default Orders;
