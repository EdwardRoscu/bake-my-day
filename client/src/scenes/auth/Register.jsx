import React from 'react';
import { Box, Button, TextField, Container, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from "react-router-dom";

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    username: yup
        .string('Enter your username')
        .min(3, 'Username should be of minimum 3 characters length')
        .required('Username is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const Register = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Handle registration with Strapi here.
        },
    });

    return (
        <Box width="90%" m="100px auto">
            <Container maxWidth="xs">
                <Typography variant="h5">Register</Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        margin="normal"
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        type="submit"
                        style={{ marginTop: '1rem', fontSize: '12px' }}
                    >
                        Register
                    </Button>
                    <Typography variant="body1" align="center" style={{ marginTop: '30px', fontSize: '14px' }}>
                        Already have an account? <Link to="/auth/login" style={{ textDecoration: 'none', color: 'blue' }}>Login</Link>
                    </Typography>
                </form>
            </Container>
        </Box>
    );
};

export default Register;
