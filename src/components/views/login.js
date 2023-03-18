
import '../../App.css';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { Box, Card, CardContent, FormGroup, TextField, Typography, Button } from "@mui/material";
import { SHA256 } from 'crypto-js';
import { getUserByEmail, newUser, userEmailExists, usernameExists } from '../api/users';

function Login() {
    const [signInFormValues, setSignInFormValues] = useState({email: '', password: ''});
    const [signUpFormValues, setSignUpFormValues] = useState({username: '', email:'', password: ''});
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

  async function validateFormSignIn(user, password) {
    const newErrors = {};

    if (user.length === 0) {
        newErrors.emailNotExists = "This email does not exist in our database";
    }else if (user[0].password !== JSON.stringify(SHA256(password).words)){
        newErrors.passwrong = "The password is incorrect";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

    async function signUp(username, email, password) {
        if (await validateForm(username, email, password)) {
            const newUserData = await newUser({
                "username": username,
                "email": email,
                "password": password
            });
            document.cookie = "username=" + username + ";";
            navigate('/' + username, { replace: true });
        }
    }

    // Currently does nothing, should navigate to list
    async function signIn(email, password) {
        const user = await getUserByEmail(email);

        if(await validateFormSignIn(user,password)){
            if (user.length !== 0){
                document.cookie = "username=" + user[0].username + ";";
                navigate('/' + user[0].username, { replace: true });
            }
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

                                            id="email-signin-input"
                                            label="E-mail"
                                            variant="outlined"
                                            name="email"
                                            error={!!errors.emailNotExists}
                                            helperText={errors.emailNotExists}
                                            value={signInFormValues.email}
                                            onChange={handleSignInInputChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <TextField
                                            id="password-signin-input"
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            name="password"
                                            error={!!errors.passwrong}
                                            helperText={errors.passwrong}
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

                                        id="username-signup-input"
                                        label="Username"
                                        variant="outlined"
                                        name="username"
                                        value={signUpFormValues.username}
                                        error={!!errors.username}
                                        helperText={errors.username}
                                        onChange={handleSignUpInputChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <TextField

                                        id="email-signup-input"
                                        label="E-mail"
                                        variant="outlined"
                                        name="email"
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        value={signUpFormValues.email}
                                        onChange={handleSignUpInputChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <TextField

                                        id="password-signup-input"
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        name="password"
                                        error={!!errors.password}
                                        helperText={errors.password}
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
