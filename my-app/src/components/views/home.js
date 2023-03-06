import React from 'react';
import '../../App.css';
import { useNavigate } from "react-router-dom";
import {Box, Button, Card,Grid, CardContent, Typography} from '@mui/material';
import {List, ListItem, ListItemText, ListItemButton, ListItemIcon} from "@mui/material";


function Home() {

    let navigate = useNavigate();
    const goToList = () => {
        let path = 'list';
        navigate(path);
    }
  return (
    <div className="App" style={{ margin: '10px'}}>
        <div className="page-title" >
            <Typography variant="h3" color="primary">
                Home
            </Typography>
        </div>
        <Box style={{ marginTop: '50px', marginBottom: '50px', marginLeft: '10%', marginRight: '10%'}}>
            <Card >
                <CardContent >
                    <Typography variant="h4" align="left">
                      User
                    </Typography>
                </CardContent>
            </Card>
        </Box>

        <Box style={{ marginTop: '50px', marginBottom: '50px', marginLeft: '10%', marginRight: '10%'}}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <Typography variant="h2" align="left" color="primary">
                        Lists
                    </Typography>
                    <List>
                        <ListItem button="true" onClick={() => goToList()}>
                            <ListItemText>
                                My First List
                            </ListItemText>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Button variant="contained" color="primary" onClick={() => goToList()}>
                        <Typography variant>
                            Create list
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </div>
  );
}

export default Home;
