
import React, { useState, useEffect} from 'react';
import '../../App.css';

import {Box, Card, CardContent, Typography, Button, Grid} from "@mui/material";
import TextField from '@mui/material/TextField';
import {SHA256} from 'crypto-js';
import { getUserByEmail, newUser, userEmailExists, usernameExists } from '../api/users';





function Login() {

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [formValues, setFormValues] = useState([]);
    const [errors, setErrors] = useState({});

    const testPass = JSON.stringify(SHA256("testpass").words);

    const validateForm = () => {
        const newErrors = {};
        if (!/^[a-zA-Z0-9]+$/.test(formValues.username)) {
        newErrors.userFormat = 'Only numbers and letters allowed';
        }
        if (!formValues.username) {
            newErrors.username = 'You forgot your username :(';
        }
        if (!formValues.password) {
            newErrors.password = 'No password? Not possible.';
        }
        if (!formValues.email) {
            newErrors.title = 'We need your email, sorry :(';
        }

        // check if email's already used!
        const emailExists = await userEmailExists(formValues["email"]);
        if (emailExists) { console.error("This email is already used"); return;}
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
  };

    // Currently does nothing, should navigate to list
    async function signUp() {
        if(validateForm()){

        }
         // TODO: add actual error front-end

        // check if username's already used
        const userExists = await usernameExists(formValues["username"]);
        if (userExists) { console.error("This username is already used"); return;}
        
        const newUserData = await newUser({
            "username": formValues["username"],
            "email": formValues["email"],
            "password": formValues["password"]
        });
        //console.log(newUserData);
        // TODO: go to homepage
    }

    // Currently does nothing, should navigate to list
    async function signIn() {
        const user = await getUserByEmail(formValues["email"]);
        if (user.length === 0) { console.error("This email does not exist in our database"); return;}

        if (user.password === formValues["password"]) { /* TODO: go to homepage */ }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name !== "password"){
            setFormValues({
            ...formValues,
            [name]: value,
          });
        } else { // we have to use crypto!
            setFormValues({
                ...formValues,
                [name]: JSON.stringify(SHA256(value).words),
              });
        }
        
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
                                <Grid container direction={"column"} spacing={4}>
                                    <Grid item>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Username"
                                            variant="outlined"
                                            name="username"
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="E-Mail"
                                            variant="outlined"
                                            name="email"
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            required
                                            id="outlined-password-input"
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                            variant="outlined"
                                            name="password"
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>
                                <div >
                                    <Button onClick={async() => {await signUp(); }}>
                                        Sign up
                                    </Button>
                                </div>
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
                                <Grid container direction={"column"} spacing={4}>
                                    <Grid item>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="E-Mail"
                                            variant="outlined"
                                            name="email"
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            required
                                            id="outlined-password-input"
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                            variant="outlined"
                                            name="password"
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>
                                <div >
                                    <Button onClick={signIn()} >
                                        Sign in
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </div>
        </div>
    )

}




export default Login;
