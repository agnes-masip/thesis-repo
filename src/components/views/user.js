import React from 'react';
import '../../App.css';
import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import {Box, Button, Card, Grid, CardContent, Typography} from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

//refactor imports one day maybe
import Amplify from '@aws-amplify/core';
import {API, graphqlOperation} from '@aws-amplify/api';
import awsconfig from '../../aws-exports';
import {listLists} from '../../graphql/queries';


Amplify.configure(awsconfig);



const initialRows = [
    {
        id: 1,
        listname: 'Important Papers',
        creator: 'Schrijnemaekers',
    },
    {
        id: 2,
        listname: 'Some other irrelevant Papers',
        creator: 'Masip-Gomez',
    },
    {
        id: 3,
        listname: 'Another list of papers',
        creator: 'van Brummelen',
    },
    {
        id: 4,
        listname: 'My Papers',
        creator: 'Christen',
    },
];


const initialUser = {"name": "najma", "mail": "some@mail.ch"}




export default function Home() {
    const [user, setUser] = React.useState(initialUser);
    const [rows, setRows] = React.useState(initialRows);

    useEffect(() => {
        fetchLists();
    }, []);



  //fetch all the papers in the database (dynamodb nosql)
  const fetchLists = async () => {

      //folder graphql in component has mutations and queries.js these is where you can find
      // the get, updates, etc. these api features export a data structure, e.g: listPapers is the export of a get
      
      const listsData = await API.graphql(graphqlOperation(listLists));
      const allLists = listsData.data.listLists.items;
      setRows(allLists)


  };

    // Currently only deletes item from list visually
    const deleteSource = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        [],
    );

    // Currently does nothing
    const goToList = React.useCallback(
        (id) => () => {
        },
        [],
    );

    // Currently does nothing
    const createList = React.useCallback(
        (id) => () => {
        },
        [],
    );

    //goes to list view
/*    let navigate = useNavigate();
    const goToList = (id) => {
        let path = 'list';
        navigate(path);
    }
*/

/*
    const columns = React.useMemo(
        () => [
            { field: 'listname', headerName: 'Listname', headerClassName: 'data-grid-header', type: 'string', flex: 1.5 },
            { field: 'creator', headerName: 'Creator', headerClassName: 'data-grid-header', type: 'string', flex: 1 },
            {
                field: 'actions',
                headerClassName: 'data-grid-header',
                type: 'actions',
                flex: 0.25,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={deleteSource(params.id)}
                    />,
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={goToList(params.id)}
                    />,

                ],
            },
        ],
        [deleteSource, goToList],
    );
*/
    const columns = [
        { field: 'id', headerName: 'ID', headerClassName: 'data-grid-header', type: 'number', flex: 1.5 },
        { field: 'listname', headerName: 'Listname', headerClassName: 'data-grid-header', type: 'string', flex: 1.5 },
        { field: 'creator', headerName: 'Creator', headerClassName: 'data-grid-header', type: 'string', flex: 1 },
    ];

    //<DataGrid columns={columns} rows={rows}/>

  return (
    <div className="Content" >
        <div className="Title" >
            <Typography variant="h4" align="left" color="primary">
                Home
            </Typography>
        </div>
        <div>
            <Box style={{ marginTop: '50px', marginBottom: '50px', marginLeft: '10%', marginRight: '10%'}}>
                <Typography variant="h6" align="left" color="primary">
                    User
                </Typography>
                <Card >
                    <CardContent >
                        <Typography variant="h7" align="left" color="primary"> Username : </Typography>
                        <Typography variant="h7" align="left" > {user.name} </Typography>
                        <br/>
                        <Typography variant="h7" align="left" color="primary"> Mail : </Typography>
                        <Typography variant="h7" align="left" > {user.mail}</Typography>
                    </CardContent>
                </Card>
            </Box>

            <Box style={{ marginTop: '50px', marginBottom: '50px', marginLeft: '10%', marginRight: '10%'}}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <Typography variant="h6" align="left" color="primary">
                            My Lists
                        </Typography>
                        <Card sx={{height: 800, width: '100%' }}>

                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Button variant="contained" color="primary" endIcon={<AddIcon />}  style={{marginTop: '15%'}} onClick={() => createList()}>
                            <Typography variant>
                                Create list
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    </div>
  );
}


