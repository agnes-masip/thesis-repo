import React from 'react'
import { Box, AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate, useParams} from "react-router-dom";
import { AccountCircle } from '@mui/icons-material';

export default function NavBar() {
    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { username } = useParams();
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        document.cookie = "username=" + username  + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/login', { replace: true });
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" component="div" color="white" sx={{ flexGrow: 1 }}>
                        <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                            LitHub
                        </Link>
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle color="background"/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={logOut}>
                                <Link to={'/login'} style={{ textDecoration: 'none'}}>
                                        Log Out
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}