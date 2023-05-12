import React from 'react';
import {useSelector} from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {useFetch} from "../../hooks/useFetch";

const Orders = () => {
    const orders = useFetch("http://localhost:4000/api/orders", json => json.data);
    const items = useSelector((state) => state.cart.items);

    function getProductName(productId) {
        const item = items.find(item => item.id === productId);
        return item && item.attributes && item.attributes.name ? item.attributes.name : 'N/A';
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: '16px', width: '20%' }}>Order ID</TableCell>
                        <TableCell sx={{ fontSize: '16px', width: '40%' }}>User Name</TableCell>
                        <TableCell sx={{ fontSize: '16px', width: '40%' }}>Products</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell component="th" scope="row" sx={{ fontSize: '14px' }}>
                                {order.id}
                            </TableCell>
                            <TableCell sx={{ fontSize: '14px' }}>
                                {order.attributes.userName}
                            </TableCell>
                            <TableCell sx={{ fontSize: '14px' }}>
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
