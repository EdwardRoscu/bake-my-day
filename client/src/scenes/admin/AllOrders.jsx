import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from '@mui/material';
import {useFetch} from '../../hooks/useFetch';
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const AllOrders = () => {
    const items = useSelector((state) => state.cart.items);
    const fetchedOrders = useFetch('http://localhost:4000/api/orders', (json) => json.data);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(fetchedOrders);
    }, [fetchedOrders]);

    function getProductName(productId) {
        const item = items.find((item) => item.id === productId);
        return item && item.attributes && item.attributes.name ? item.attributes.name : 'N/A';
    }

    const handleDelete = async (orderId) => {
        try {
            await axios.delete(`http://localhost:4000/api/orders/${orderId}`);
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontSize: '16px', width: '15%'}}>Order ID</TableCell>
                        <TableCell sx={{fontSize: '16px', width: '20%'}}>Name</TableCell>
                        <TableCell sx={{fontSize: '16px', width: '25%'}}>Email</TableCell>
                        <TableCell sx={{fontSize: '16px', width: '15%'}}>Phone</TableCell>
                        <TableCell sx={{fontSize: '16px', width: '15%'}}>Products</TableCell>
                        <TableCell sx={{fontSize: '16px', width: '10%', textAlign: 'center'}}>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell component="th" scope="row" sx={{fontSize: '14px'}}>
                                {order.id}
                            </TableCell>
                            <TableCell sx={{fontSize: '14px'}}>
                                {order.attributes.userName}
                            </TableCell>
                            <TableCell sx={{fontSize: '14px'}}>
                                {order.attributes.email}
                            </TableCell>
                            <TableCell sx={{fontSize: '14px'}}>
                                {order.attributes.phone}
                            </TableCell>
                            <TableCell sx={{fontSize: '14px'}}>
                                {order.attributes.products.map((product) => (
                                    <div key={product.id}>
                                        {product.count} {getProductName(product.id)}
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell align="center">
                                <IconButton
                                    color="primary"
                                    onClick={() => handleDelete(order.id)}
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

export default AllOrders;
