
import React, { useState, useEffect} from 'react';
import '../../App.css';

import { Link, useParams } from "react-router-dom";

import {Box, Card, CardContent, FormGroup, Typography, Button, TextField} from "@mui/material";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NavBar from "../navbar";

import { getAllListsForUser, deleteListById, createNewList } from '../api/lists';
import { getUserById, getUserByUsername } from '../api/users';

function Home() {
  const { username } = useParams();
  const [formValues, setFormValues] = useState([]);
  const [rows, setRows] = React.useState([]);
  const [user, setUser] = React.useState([]);

  // useEffect is to call the fetch every time we go to home.js
  useEffect(async () => {
        fetchLists();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await getUserByUsername(username);
    formValues.listOwner = user[0].id;
    formValues.papers = [];
    formValues.sharedWith = [];
    await createNewList(formValues);
    await fetchLists();
    // todo: empty formfields
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

    const deleteList = async(listId) => { 
        await deleteListById(listId);
        await fetchLists();
    }

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
                    <Link to={'/list/' + username + '/' + params.row.listOwner + '/' + params.id}>
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
      const userData = await getUserByUsername(username);
      const user = userData[0];
      setUser(user);
      const listList = await getAllListsForUser(user.id);
      let lists = [];
      for (let listData of listList) {
        const listOwnerData = await getUserById(listData.listOwner);
        listData.listOwner = listOwnerData.username;
        lists.push(listData);
      }
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
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Typography color="primary">
                                                    Username:
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography>
                                                    {user.username}
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
                                                    {user.email}
                                                </Typography>
                                            </td>
                                        </tr>
                                  </tbody>
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
