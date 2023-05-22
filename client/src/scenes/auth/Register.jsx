import React, {useState} from 'react';
import {Box, Button, Container, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';

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
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:4000/api/auth/local/register', {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                });

                if (response.status === 200) {
                    navigate("/auth/login");
                }
            } catch (error) {
                if (error.response && error.response.status) {
                    if (error.response.status === 400) {
                        // Validation error, the provided data did not pass server validation
                        setErrorMessage('Validation error: ' + error.response.data.error.message);
                    } else if (error.response.status >= 500) {
                        // Server error, something went wrong on the server
                        setErrorMessage('Server error. Please try again later.');
                    } else {
                        // Other status codes
                        setErrorMessage('An error occurred. Please try again.');
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    setErrorMessage('No response was received from the server. Please check your internet connection and try again.');
                } else {
                    // Other errors (like losing internet connection)
                    setErrorMessage('An error occurred while making the request. Please check your internet connection and try again.');
                }
            }
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
                    {errorMessage && (
                        <Typography variant="body1" color="error" align="center">
                            {errorMessage}
                        </Typography>
                    )}
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
