
import React, { useState, useEffect} from 'react';
import '../../App.css';
// import Amplify, { API, graphqlOperation } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import {API, graphqlOperation} from '@aws-amplify/api';
import awsconfig from '../../aws-exports';
import { Link } from "react-router-dom";
import { listLists} from '../../graphql/queries';
import {Box, Card, CardContent, Typography, Button, Grid} from "@mui/material";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NavBar from "../navbar";

import { getAllListsForUser, deleteListById } from '../api/lists';
import {deletePaperById} from "../api/papers";



Amplify.configure(awsconfig);


const initialUser = {name:"Najma", mail:"some@mail.ch", userId: "user2"};


function Home() {

  // the variable papers is the data you can use in frontend
  const [papers, setPapers] = useState([]);
  const [title, setTitle] = useState([]);
  const [author, setAuthor] = useState([]);
  const [rows, setRows] = React.useState([]);
  const [listRows, setListRows] = React.useState([]);
  const [user, setUser] = React.useState(initialUser);



    // Currently only deletes item from list visually
    const deleteSource = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        [],
    );


    //
    const deleteList = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setListRows((prevListRows) => prevListRows.filter((row) => row.id !== id));
                deleteListById(id);
            });
        },
        [],
    );

    const columns = React.useMemo(
        () => [
            { field: 'title', headerName: 'Listname', headerClassName: 'data-grid-header', type: 'string', flex: 1.5 },
            { field: 'listOwner', headerName: 'Owner', headerClassName: 'data-grid-header', type: 'string', flex: 1 },
            {
                field: 'actions',
                headerClassName: 'data-grid-header',
                type: 'actions',
                flex: 0.5,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={deleteList(params.id)}
                    />,
                    <Link to={'/list/' + params.id}>
                        <GridActionsCellItem
                            icon={<VisibilityIcon />}
                            label="view"
                        />
                    </Link>,
                ]
            },
        ],
        [deleteSource],
    );


    // useEffect is to call the fetch every time we go to home.js
  useEffect(() => {
        fetchLists();
    }, []);



  //fetch all the papers in the database (dynamodb nosql)
  const fetchLists = async () => {

      //folder graphql in component has mutations and queries.js these is where you can find
      // the get, updates, etc. these api features export a data structure, e.g: listPapers is the export of a get
      const listList = await getAllListsForUser(user.userId);

      setRows(listList);
  };



    // Currently does nothing, should navigate to Profile
    const editProfile = React.useCallback(
        () => () => {
        },
        [],
    );


  return(
      <div>
          <NavBar/>
          <div className="Content">
              <div className="Title">
                  <Typography variant="h4" align="left" color="primary">
                      Home
                  </Typography>
              </div>
              <div>
                  <Box my={4}>
                      <Box sx={{display: 'grid', gridAutoColumns: '1fr', gap: 1,}}>
                          <Typography variant="h6" align="left" color="primary" sx={{ gridRow: '1', gridColumn: 'span 2' }} >
                              User
                          </Typography>
                          <Button  endIcon={<EditIcon />} onClick={editProfile()} sx={{ gridRow: '1', gridColumn: '7/8' }}>
                              Edit
                          </Button>
                      </Box>
                      <Card>
                          <CardContent>
                              <table >
                                  <tr>
                                      <td>
                                          <Typography color="primary">
                                              Username:
                                          </Typography>
                                      </td>
                                      <td>
                                          <Typography>
                                              {user.name}
                                          </Typography>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>
                                          <Typography color="primary">
                                              E-mail:
                                          </Typography>
                                      </td>
                                      <td>
                                          <Typography>
                                              {user.mail}
                                          </Typography>
                                      </td>
                                  </tr>
                              </table>
                          </CardContent>
                      </Card>
                  </Box>
                  <Box my={4}>
                      <Box sx={{display: 'grid', gridAutoColumns: '1fr', gap: 1,}}>
                          <Typography variant="h6" align="left" color="primary" sx={{ gridRow: '1', gridColumn: 'span 2' }} >
                              My Lists
                          </Typography>
                          <Button endIcon={<AddIcon />}  sx={{ gridRow: '1', gridColumn: '7/8' }}>
                              Create
                          </Button>
                      </Box>
                      <Card sx={{height: 400, width: '100%' }}>
                          <DataGrid columns={columns} rows={rows}/>
                      </Card>
                  </Box>
              </div>
          </div>
      </div>
    )
}

export default Home;
