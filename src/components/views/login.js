
import React, { useState, useEffect} from 'react';
import '../../App.css';
// import Amplify, { API, graphqlOperation } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import {API, graphqlOperation} from '@aws-amplify/api';
import awsconfig from '../../aws-exports';
import {Box, Card, CardContent, Typography, Button} from "@mui/material";
import TextField from '@mui/material/TextField';
import EditIcon from "@mui/icons-material/Edit";




//Amplify.configure(awsconfig);


function Login() {

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
                    <Box sx={{ gridRow: '1'}}>
                        <div className="Title">
                            <Typography variant="h4" align="left" color="primary">
                                Sign in
                            </Typography>
                        </div>
                        <Card>
                            <CardContent>
                                <table>
                                    <tr>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Username"
                                            variant="outlined"
                                        />
                                    </tr>
                                    <tr>
                                        <TextField
                                            id="outlined-password-input"
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                            variant="outlined"
                                        />
                                    </tr>
                                    <tr>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="E-Mail"
                                            variant="outlined"
                                        />
                                    </tr>
                                </table>
                                <Button onClick={signUp()} >
                                    Sign up
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{gridRow: '1'}}>
                        <div className="Title">
                            <Typography variant="h4" align="left" color="primary">
                                Sign up
                            </Typography>
                        </div>
                        <Card>
                            <CardContent>
                                <table>
                                    <tr>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="E-Mail"
                                            variant="outlined"
                                        />
                                    </tr>
                                    <tr>
                                        <TextField
                                            id="outlined-password-input"
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                            variant="outlined"
                                        />
                                    </tr>
                                </table>
                                <Button onClick={signIn()} >
                                    Sign in
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </div>
        </div>
    )

}




export default Login;
