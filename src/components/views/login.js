import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Avatar, Button, TextField, Link, Paper, Box, Grid, Typography }from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SHA256 } from 'crypto-js';
import image from "./../img/login.jpg"
import { getUserByEmail } from '../api/users';

export default function LogIn() {
  const [formValues, setFormValues] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function validateForm(user, password) {
    const newErrors = {};

    if (user.length === 0) {
        newErrors.emailNotExists = "This email does not exist in our database";
    }else if (user[0].password !== JSON.stringify(SHA256(password).words)){
        newErrors.passwrong = "The password is incorrect";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function signIn(email, password) {
    const user = await getUserByEmail(email);

    if(await validateForm(user,password)){
        if (user.length !== 0){
            document.cookie = "username=" + user[0].username + ";";
            navigate('/' + user[0].username, { replace: true });
        }
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
    signIn(formValues.email, formValues.password);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:`url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'primay',
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
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} className = "signInClass">
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
                    className = "signInButtonClass"
                >
                    Sign In
                </Button>
                <Link href="/signup" variant="body2" className="goToSignUp">
                Don't have an account? Sign up
                </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}