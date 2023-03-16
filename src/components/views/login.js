
import React, { useState, useEffect} from 'react';
import '../../App.css';

import {Box, Card, CardContent, FormGroup, Typography, Button} from "@mui/material";
import TextField from '@mui/material/TextField';
import {SHA256} from 'crypto-js';
import { getUserByEmail, newUser, userEmailExists, usernameExists } from '../api/users';

function Login() {
    const [signInFormValues, setSignInFormValues] = useState([]);
    const [signUpFormValues, setSignUpFormValues] = useState([]);

    const testPass = JSON.stringify(SHA256("testpass").words);

    // Currently does nothing, should navigate to list
    async function signUp(username, email, password) {
        // check if email's already used!
        const emailExists = await userEmailExists(email);
        if (emailExists) {
            console.error("This email is already used");
            return;
        } // TODO: add actual error front-end

        // check if username's already used
        const userExists = await usernameExists(username);
        if (userExists) {
            console.error("This username is already used");
            return;
        }

        const newUserData = await newUser({
            "username": username,
            "email": email,
            "password": password
        });

        return <Navigate to="/" />;
    }

    // Currently does nothing, should navigate to list
    async function signIn(email, password) {
        const user = await getUserByEmail(email);
        console.log(user[0]);
        console.log(user[0].password);
        console.log(password);
        if (user.length === 0) {
            console.error("This email does not exist in our database");
            return;
        }
        if (user.password === password) { /* TODO: go to homepage */
            console.log('log in OK');
        }
        else {
            console.log('log in NOT OKK');
        }
    }

    const handleSignInInputChange = (event) => {
        const { name, value } = event.target;
        setSignInFormValues({
            ...signInFormValues,
            [name]: value,
        });
    };

    const handleSignInSubmit = (event) => {
        event.preventDefault();
        signIn(signInFormValues.email, signInFormValues.password);
    };

    const handleSignUpInputChange = (event) => {
        const { name, value } = event.target;
        setSignUpFormValues({
            ...signUpFormValues,
            [name]: value,
        });
    };

    const handleSignUpSubmit = (event) => {
        event.preventDefault();
        signUp(signUpFormValues.username, signUpFormValues.email, signUpFormValues.password);
    };

    return (
        <div className="Content">
            <div>
                <Box my={4} sx={{display: 'grid', gridTemplateRows: 'repeat(2, 1fr)' , gap: 1,}}>
                    <Box sx={{ gridRow: '1', margin: "50px" }} >
                        <div className="Title">
                            <Typography variant="h4" align="left" color="primary">
                                Sign in
                            </Typography>
                        </div>
                        <Card sx={{ height: "100%",display:'flex', justifyContent:'center',padding:"10px" }}>
                            <CardContent>
                                <form onSubmit={handleSignInSubmit}>
                                    <FormGroup>
                                        <TextField
                                            required
                                            id="email-input"
                                            label="E-mail"
                                            variant="outlined"
                                            name="email"
                                            value={signInFormValues.email}
                                            onChange={handleSignInInputChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <TextField
                                            required
                                            id="password-input"
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            name="password"
                                            value={signInFormValues.password}
                                            onChange={handleSignInInputChange}
                                        />
                                    </FormGroup>
                                    <Button type="submit" variant="contained">
                                        Sign in
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{gridRow: '1', margin: "50px" }} >
                        <div className="Title">
                            <Typography variant="h4" align="left" color="primary">
                                Sign up
                            </Typography>
                        </div>
                        <Card sx={{ height: "100%", display:'flex', justifyContent:'center',padding:"10px" }}>
                            <CardContent>
                            <form onSubmit={handleSignUpSubmit}>
                                <FormGroup>
                                    <TextField
                                        required
                                        id="username-input"
                                        label="Username"
                                        variant="outlined"
                                        name="username"
                                        value={signUpFormValues.username}
                                        onChange={handleSignUpInputChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <TextField
                                        required
                                        id="email-input"
                                        label="E-mail"
                                        variant="outlined"
                                        name="email"
                                        value={signUpFormValues.email}
                                        onChange={handleSignUpInputChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <TextField
                                        required
                                        id="password-input"
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        name="password"
                                        value={signUpFormValues.password}
                                        onChange={handleSignUpInputChange}
                                    />
                                </FormGroup>
                                <Button type="submit" variant="contained">
                                    Sign Up
                                </Button>
                            </form>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </div>
        </div>
    )

}




export default Login;
