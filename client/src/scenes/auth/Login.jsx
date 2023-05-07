import React from 'react';
import { Box, Button, TextField, Container, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from "react-router-dom";

const validationSchema = yup.object({
    identifier: yup
        .string('Enter your email or username')
        .required('Email or username is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const Login = () => {
    const formik = useFormik({
        initialValues: {
            identifier: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Handle login with Strapi here.
        },
    });

    return (
        <Box width="90%" m="100px auto">
            <Container maxWidth="xs">
                <Typography variant="h5">Login</Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="identifier"
                        name="identifier"
                        label="Email or Username"
                        value={formik.values.identifier}
                        onChange={formik.handleChange}
                        error={formik.touched.identifier && Boolean(formik.errors.identifier)}
                        helperText={formik.touched.identifier && formik.errors.identifier}
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
                        Login
                    </Button>
                    <Typography variant="body1" align="center" style={{ marginTop: '30px', fontSize: '14px' }}>
                        Not a member? <Link to="/auth/register" style={{ textDecoration: 'none', color: 'blue' }}>Register</Link>
                    </Typography>
                </form>
            </Container>
        </Box>
    );
};

export default Login;