
import React, { useState, useEffect} from 'react';
import '../../App.css';

import { Link } from "react-router-dom";

import {Box, Card, CardContent, FormGroup, Typography, Button, TextField} from "@mui/material";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NavBar from "../navbar";

import { getAllListsForUser, deleteListById, createNewList } from '../api/lists';


const initialUser = {name:"Najma", mail:"some@mail.ch", userId: "user2"};


function Home() {

  const [formValues, setFormValues] = useState([]);
  const [rows, setRows] = React.useState([]);
  const [user, setUser] = React.useState(initialUser);

  // useEffect is to call the fetch every time we go to home.js
  useEffect(() => {
    fetchLists();
}, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    //need to change this when we fix login
    formValues.listOwner = initialUser.userId;
    formValues.papers = [];
    formValues.sharedWith = [];
    createNewList(formValues)
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

    const deleteList = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
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
                        onClick={() => deleteList(params.id)}
                    />,
                    <Link to={'/list/' + params.row.listOwner + '/' + params.id}>
                        <GridActionsCellItem
                            icon={<VisibilityIcon />}
                            label="view"
                        />
                    </Link>
                ]
            },
        ],
        [deleteList],
    );

  const fetchLists = async () => {
      const listList = await getAllListsForUser(user.userId);
      setRows(listList);
  };

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
                      </Box>
                      <Card sx={{height: 500, width: '100%' }}>
                            <form onSubmit={handleSubmit}>
                                <FormGroup sx={{ display: 'grid', gridAutoColumns: '1fr' }}>
                                    <TextField sx={{ gridRow: '1', gridColumn: '1/6' }}
                                        id="title"
                                        name="title"
                                        label="listName"
                                        type="text"
                                        value={formValues.title}
                                        onChange={handleInputChange}
                                    />
                                    <Button type="submit" variant="contained" sx={{gridRow: '1', gridColumn: '6/7' }}>
                                    <AddIcon/>
                                    </Button>
                                </FormGroup>
                            </form>
                            <DataGrid columns={columns} rows={rows}/>
                      </Card>
                  </Box>
              </div>
          </div>
      </div>
    )
}

export default Home;
