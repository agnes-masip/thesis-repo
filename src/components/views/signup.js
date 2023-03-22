import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Avatar, Button, TextField, Link, Paper, Box, Grid, Typography }from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SHA256 } from 'crypto-js';
import { newUser, userEmailExists, usernameExists } from '../api/users';
import image from "./../img/login.jpg"

export default function SignUp() {
    const [formValues, setFormValues] = useState({username: '', email:'', password: ''});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    async function validateForm(username, email, password) {
        const newErrors = {};
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
        newErrors.username = 'Only numbers and letters allowed';
        }
        if (!username) {
            newErrors.username = (newErrors.username || '') + 'You forgot your username :(';
        }
        if (!password) {
            newErrors.password = 'No password? Not possible.';
        }
        if (!email) {
            newErrors.title = 'We need your email, sorry :(';
        }

        // check if email's already used!
        const emailExists = await userEmailExists(email);
        if (emailExists) { newErrors.email = (newErrors.email || '') + 'This email is already used';}

         // check if username's already used
        const userExists = await usernameExists(username);
        if (userExists) { newErrors.username = (newErrors.username || '') + 'This username is already used';}

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function signUp(username, email, password) {
        if (await validateForm(username, email, password)) {
            await newUser({
                "username": username,
                "email": email,
                "password": JSON.stringify(SHA256(password).words)
            });
            document.cookie = "username=" + username + ";";
            navigate('/' + username, { replace: true });
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        signUp(formValues.username, formValues.email, formValues.password);
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid item xs={false} sm={4} md={7}
            sx={{
                backgroundImage:`url(${image})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'primary',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Typography variant="h4" color="primary">
                        LitHub
                    </Typography>
                </Box>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            id="username"
                            label="Username"
                            name="username"
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="username"
                            autoFocus
                            value={formValues.username}
                            error={!!errors.username}
                            helperText={errors.username}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={!!errors.emailNotExists}
                            helperText={errors.emailNotExists}
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={!!errors.passwrong}
                            helperText={errors.passwrong}
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign up
                        </Button>
                        <Link href="/login" variant="body2">
                        Already have an account? Log in
                        </Link>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}