import React, {useState} from 'react';
import {Box, Button, Container, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';

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
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            identifier: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:4000/api/auth/local', {
                    identifier: values.identifier,
                    password: values.password,
                });

                const jwt = response.data.jwt;
                const user = response.data.user;

                if (jwt && user) {
                    localStorage.setItem('jwt', jwt);
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('userId', user.id);
                    localStorage.setItem('isAdmin', user.isAdmin);
                }

                if (response.data.user["isAdmin"]) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
                window.location.reload();

            } catch (error) {
                setErrorMessage(error.response.data.error.message || 'An error occurred.');
            }
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
                        style={{marginTop: '1rem', fontSize: '12px'}}
                        data-testid="login-button"
                    >
                        Login
                    </Button>
                    <Typography variant="body1" align="center" style={{marginTop: '30px', fontSize: '14px'}}>
                        Not a member? <Link to="/auth/register"
                                            style={{textDecoration: 'none', color: 'blue'}}>Register</Link>
                    </Typography>
                </form>
            </Container>
        </Box>
    );
};

export default Login;
