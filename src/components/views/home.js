
import React, { useState, useEffect} from 'react';
import '../../App.css';
// import Amplify, { API, graphqlOperation } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import {API, graphqlOperation} from '@aws-amplify/api';
import awsconfig from '../../aws-exports';
import { Link } from "react-router-dom";
import { listPapers} from '../../graphql/queries';
import {Box, Card, CardContent, Typography, Button, Grid} from "@mui/material";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';



Amplify.configure(awsconfig);

const initialRows = [
    {
        id: 1,
        listname: 'Some Long Ass List',
        owner: 'Schrijnemaekers et al.',
    },
    {
        id: 2,
        listname: 'An Even Longer Paper List Because Real',
        owner: 'Masip-Gomez et al.',
    },
];

const initialUser = {name:"Najma", mail:"some@mail.ch"};




function Home() {

  // the variable papers is the data you can use in frontend
  const [papers, setPapers] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rows, setRows] = React.useState(initialRows);
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

    const columns = React.useMemo(
        () => [
            { field: 'listname', headerName: 'Listname', headerClassName: 'data-grid-header', type: 'string', flex: 1.5 },
            { field: 'owner', headerName: 'Owner', headerClassName: 'data-grid-header', type: 'string', flex: 1 },
            {
                field: 'actions',
                headerClassName: 'data-grid-header',
                type: 'actions',
                flex: 0.5,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={deleteSource(params.id)}
                    />,
                    <GridActionsCellItem
                        icon={<VisibilityIcon />}
                        label="view"
                    />,
                ]
            },
        ],
        [deleteSource],
    );


    // useEffect is to call the fetch every time we go to home.js
  useEffect(() => {
        fetchPapers();
    }, []);



  //fetch all the papers in the database (dynamodb nosql)
  const fetchPapers = async () => {

      //folder graphql in component has mutations and queries.js these is where you can find
      // the get, updates, etc. these api features export a data structure, e.g: listPapers is the export of a get
      console.log("fuckmylife")
      const paperData = await API.graphql(graphqlOperation(listPapers));
      const paperList = paperData.data.listPapers.items;
      console.log(paperList)
      setPapers(paperList)


  };

  const updatePaper = async (id, title) => {
    try {
        const paper = papers[id];
        paper.title = "we need to pass a variable here";
        delete paper.createdAt;
        delete paper.updatedAt;

        const paperData = await API.graphql(graphqlOperation(updatePaper, { input: paper }));
        const paperList = [...papers];
        paperList[id] = paperData.data.updatePaper;
        setPapers(paperList);
    } catch (error) {
        console.log('error on updating paper info', error);
    }
};

const deletePaper = async (id) => {
    try {
        const paper = papers[id];
        delete paper.createdAt;
        delete paper.updatedAt;

        const paperData = await API.graphql(graphqlOperation(deletePaper, { input: paper }));
        const paperList = [...papers];
        paperList[id] = paperData.data.deletePaper;
        setPapers(paperList);
    } catch (error) {
        console.log('error on deleting a paper', error);
    }
};

    // Currently does nothing, should navigate to Profile
    const editProfile = React.useCallback(
        () => () => {
        },
        [],
    );


  return(
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
