import React from 'react'
import { Box, AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { AccountCircleOutlined } from '@mui/icons-material';

export default function NavBar() {
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                <AccountCircleOutlined/>
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
                <MenuItem onClick={handleClose}>
                  <Link to={'/user'} style={{ textDecoration: 'none'}}>
                    Profile
                  </Link>
                </MenuItem>
                {/* TODO: direct to actual log-out */}
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
          </Toolbar>
        </AppBar>
      </Box>
    )
}
