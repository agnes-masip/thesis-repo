
import React, { useState, useEffect} from 'react';
import '../../App.css';
// import Amplify, { API, graphqlOperation } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import {API, graphqlOperation} from '@aws-amplify/api';
import awsconfig from '../../aws-exports';
import {Box, Card, CardContent, Typography, Button, Grid} from "@mui/material";
import TextField from '@mui/material/TextField';





//Amplify.configure(awsconfig);


function Login() {

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    // Currently does nothing, should navigate to list
    const signUp = React.useCallback(
        (id) => () => {
        },
        [],
    );

    // Currently does nothing, should navigate to list
    const signIn = React.useCallback(
        (id) => () => {
        },
        [],
    );


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
                                            onChange={un => setUsername(un)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="E-Mail"
                                            variant="outlined"
                                            onChange={un => setEmail(un)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="outlined-password-input"
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                            variant="outlined"
                                            onChange={n => setPassword(n)}
                                        />
                                    </Grid>
                                </Grid>
                                <div >
                                    <Button onClick={signUp()}>
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
                                            onChange={n => setEmail(n)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="outlined-password-input"
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                            variant="outlined"
                                            onChange={n => setPassword(n)}
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
