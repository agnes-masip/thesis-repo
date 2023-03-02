import React from 'react';
import '../../App.css';
import {Box, Button, Card, CardContent, Typography} from '@mui/material';
import {List, ListItem, ListItemText} from "@mui/material";

function Home() {
  return (
    <div className="App" >
        <div className="page-title" color="primary">
            <Typography variant="h3" color="primary">
                Home
            </Typography>
        </div>
        <Box color="secondary">
            <Card >
                <CardContent >
                    User
                </CardContent>
            </Card>
        </Box>
        <Box>
            <Typography variant="h3" color="primary">
                Lists
            </Typography>
            <List>
                <ListItem>
                    <ListItemText>
                        MyFirstList
                    </ListItemText>
                </ListItem>
            </List>

        </Box>
        <Button>
            Create list
        </Button>
    </div>
  );
}

export default Home;
