
import React, { useState, useEffect} from 'react';
import '../../App.css';

import { Link } from "react-router-dom";

import {Box, Card, CardContent, Typography, Button, TextField} from "@mui/material";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NavBar from "../navbar";

import { getAllListsForUser, deleteListById, createNewList } from '../api/lists';
//import {deletePaperById} from "../api/papers";


const initialUser = {name:"Najma", mail:"some@mail.ch", userId: "user2"};


function Home() {

  const [formValues, setFormValues] = useState([]);
  const [rows, setRows] = React.useState([]);
  const [listRows, setListRows] = React.useState([]);
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
    console.log(formValues);
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
                console.log("fuck")
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
        [deleteList],
    );


    


  //fetch all the papers in the database (dynamodb nosql)
  const fetchLists = async () => {

      //folder graphql in component has mutations and queries.js these is where you can find
      // the get, updates, etc. these api features export a data structure, e.g: listPapers is the export of a get
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
                          <form onSubmit={handleSubmit}>
                          <TextField
                                      id="title"
                                      name="title"
                                      label="listName"
                                      type="text"
                                      value={formValues.title}
                                      onChange={handleInputChange}
                                  />
                          <Button  type="submit" variant="contained" endIcon={<AddIcon />}  sx={{ gridRow: '1', gridColumn: '7/8' } }>
                              Create
                          </Button>
                          </form>
                      </Box>
                      <Card sx={{height: 400, width: '100%' }}>
                          <DataGrid columns={columns} rows={rows}/>
                      </Card>
                  </Box>
              </div>
          </div>
      </div>
  )









/*
  return (
    <div className="App">
      <header className="App-header">

        <h1>Papers</h1>
          <table>
            <tbody>
              <tr>
                <th>Paper ID</th>
                <th>Paper Title</th>
                <th>Paper Author</th>
                <th>Button to edit data</th>
              </tr>
                {papers.map((paper) => {
                  return (
                    <tr key='${paper.id}'>
                      <td>{paper.id}</td>
                      <td>{paper.title}</td>

                       {/*This button is to use if you create a form for the changes. Right now,
                         it only changes the title. }

                         <button onClick={() => updatePaper(paper.id, "idList")}> </button>

                        {/* This button is to delete the paper.
                         <button onClick={() => deletePaper(paper.id)}> </button> }
                    </tr>
                  );
                })}
              </tbody>
          </table>
          <h1>Papers in a specific list</h1>



              {/*This is the form to upload papers.}
          {/* <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div>
              <label htmlFor="body">Author:</label>
              <input type="text" id="author" value={author}  onChange={(event) => setAuthor(event.target.value)} />
            </div>
             <button type="submit">Create paper</button>
          </form> }
      </header>
    </div>
  );
*/
}

export default Home;
